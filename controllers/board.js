const { v4: uuidv4 } = require('uuid');
const { body, param, query, matchedData, validationResult } = require('express-validator');

const cookieOptions = require('../../scripts/cookieOptions');
const utils = require('../../scripts/utilities');
const winston = require('../../scripts/log');
const rateLimiter = require('../../scripts/rateLimiter');

const mongoose = require('mongoose');
const accountModels = require('../../account/models.js');
const boardModels = require('../models.js');

const BASEPATH = '/projects/tactics-board';

exports.home_get = [
  query('p', 'Invalid value')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt({ min: 1, max: 100 })
    .toInt(10),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['query'] });
    let errors = validationResult(req);
    let page = 0, pageSize = 10, viewable = 2, pages, start, end;
    if (errors.isEmpty()) {
      page = (data.p) ? data.p - 1 : 0;
    }
    boardModels.board.find({ public: true }).countDocuments().exec()
      .then(function(documents) {
        pages = new Array(Math.ceil(documents / pageSize));
        pages = pages.fill(1);
        pages = pages.map((curr, index) => { return index + 1; });
        if (pages[pages.length - 1] - pages[page] < viewable) {
          end = (pages[pages.length - 1] - pages[page]) + pages[page];
        } else {
          end = pages[page] + viewable;
        }
        if (pages[page] - pages[0] < viewable) {
          start = pages[page] - (pages[page] - pages[0]);
        } else {
          start = pages[page] - viewable;
        }
        pages = pages.slice((start - 1), end);
        return boardModels.board.find({ public: true })
          .sort({ updated: 'desc' })
          .skip(page * pageSize)
          .limit(pageSize)
          .lean()
          .exec();
      })
      .then(function(boards) {
        for (let board of boards) {
          if (!board.rating) {
            board.rating = '-';
          }
          let formattedUpdated = utils.getDateTime(req.signedCookies.TD, board.updated);
          if (formattedUpdated.timeZoneName) {
            board.updated = formattedUpdated.dateString + ' ' +
                            formattedUpdated.timeString + ' (' +
                            formattedUpdated.timeZoneName + ')';
          } else {
            board.updated = formattedUpdated.dateString + ' ' + formattedUpdated.timeString;
          }
        }
        res.render('../tactics-board/views/all', {
          title: 'Tactics Boards',
          boards: boards,
          basepath: BASEPATH,
          pages: pages,
          currentPage: page + 1,
          startPage: start,
          endPage: end,
        });
      })
      .catch(function(err) {
        if (err) {
          winston.logger.error(err);
        }
        res.render('../tactics-board/views/confirm', {
          title: 'Tactics Board',
          error: 'An error occurred while loading the boards. Please try again later.',
          back: 2
        });
      });
  }
];

exports.my_boards_get = [
  query('p', 'Invalid value')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt({ min: 1, max: 100 })
    .toInt(10),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['query'] });
    let errors = validationResult(req);
    if (req.session.loggedInAs && req.session.loggedInAsId) {
      let page = 0, pageSize = 10, viewable = 2, pages, start, end;
      if (errors.isEmpty()) {
        page = (data.p) ? data.p - 1 : 0;
      }
      boardModels.board.find({ owner: req.session.loggedInAs }).countDocuments().exec()
        .then(function(documents) {
          pages = new Array(Math.ceil(documents / pageSize));
          pages = pages.fill(1);
          pages = pages.map((curr, index) => { return index + 1; });
          if (pages[pages.length - 1] - pages[page] < viewable) {
            end = (pages[pages.length - 1] - pages[page]) + pages[page];
          } else {
            end = pages[page] + viewable;
          }
          if (pages[page] - pages[0] < viewable) {
            start = pages[page] - (pages[page] - pages[0]);
          } else {
            start = pages[page] - viewable;
          }
          pages = pages.slice((start - 1), end);
          return boardModels.board.find({ owner: req.session.loggedInAs })
            .sort({ updated: 'desc' })
            .skip(page * pageSize)
            .limit(pageSize)
            .lean()
            .exec();
        })
        .then(function(boards) {
          for (let board of boards) {
            if (!board.rating) {
              board.rating = '-';
            }
            let formattedUpdated = utils.getDateTime(req.signedCookies.TD, board.updated);
            if (formattedUpdated.timeZoneName) {
              board.updated = formattedUpdated.dateString + ' ' +
                              formattedUpdated.timeString + ' (' +
                              formattedUpdated.timeZoneName + ')';
            } else {
              board.updated = formattedUpdated.dateString + ' ' + formattedUpdated.timeString;
            }
          }
          res.render('../tactics-board/views/myboards', {
            title: 'My Boards',
            boards: boards,
            basepath: BASEPATH,
            pages: pages,
            currentPage: page + 1,
            startPage: start,
            endPage: end,
          });
        })
        .catch(function(err) {
          if (err) {
            winston.logger.error(err);
          }
          res.render('../tactics-board/views/confirm', {
            title: 'My Boards',
            error: 'An error occurred while getting the data. Please try again later.',
            back: 2,
          });
        });
    } else {
      res.redirect('/website/account/login');
    }
  }
];

exports.board_create_get = function(req, res, next) {
  if (req.session.loggedInAs && req.session.loggedInAsId) {
    res.render('../tactics-board/views/board', {
      title: 'Edit Tactics Board',
      id: '',
      back: 2,
      viewOnly: 0,
    });
  } else {
    res.redirect('/website/account/login');
  }
};

exports.board_view_get = [
  param('uuid', 'Invalid UUID.')
    .trim()
    .isLength({ min: 36, max: 36 })
    .matches(/^[A-Fa-f0-9\-]{36}$/)
    .whitelist('A-Fa-f0-9\\-')
    .escape(),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['params'] });
    boardModels.board.findOne()
      .or([{ uuid: data.uuid, owner: req.session.loggedInAs }, { uuid: data.uuid, public: true }])
      .exec()
      .then(function(board) {
        if (!board) {
          return Promise.reject(null);
        } else {
          res.render('../tactics-board/views/board', {
            title: 'View Tactics Board',
            id: data.uuid,
            back: 2,
            viewOnly: 1,
          });
        }
      })
      .catch(function(err) {
        if (err) {
          winston.logger.error(err);
        }
        res.render('../tactics-board/views/confirm', {
          title: 'View Tactics Board',
          error: 'No board found.',
          back: 2,
        });
      });
  }
];

exports.board_edit_get = [
  param('uuid', 'Invalid UUID.')
    .trim()
    .isLength({ min: 36, max: 36 })
    .matches(/^[A-Fa-f0-9\-]{36}$/)
    .whitelist('A-Fa-f0-9\\-')
    .escape(),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['params'] });
    if (req.session.loggedInAs && req.session.loggedInAsId) {
      boardModels.board.findOne({ uuid: data.uuid, owner: req.session.loggedInAs }).exec()
        .then(function(board) {
          if (!board) {
            res.render('../tactics-board/views/confirm', {
              title: 'Edit Tactics Board',
              error: 'No board found.',
              back: 2,
            });
          } else {
            res.render('../tactics-board/views/board', {
              title: 'Edit Tactics Board',
              id: data.uuid,
              back: 2,
              viewOnly: 0,
            });
          }
        })
        .catch(function(err) {
          if (err) {
            winston.logger.error(err);
          }
          res.render('../tactics-board/views/confirm', {
            title: 'Edit Tactics Board',
            error: 'No board found.',
            back: 2,
          });
        });
    } else {
      res.redirect('/website/account/login');
    }
  }
];

exports.board_rate_post = [
  body('uuid', 'Invalid UUID.')
    .trim()
    .isLength({ min: 36, max: 36 })
    .matches(/^[A-Fa-f0-9\-]{36}$/)
    .whitelist('A-Fa-f0-9\\-')
    .escape(),
  body('rating', 'Must be numeric.')
    .trim()
    .isNumeric({ no_symbols: true })
    .isInt({ min: 0, max: 5 })
    .escape(),
  body('g-recaptcha-response', 'Failed reCAPTCHA test.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_\-]+$/),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['body'] });
    let errors = validationResult(req);
    if (!req.session.loggedInAs || !req.session.loggedInAsId) {
      if (req.xhr) {
        res.status(401).json('Not logged in.');
      } else {
        res.redirect('/website/account/login');
      }
    } else if (errors.isEmpty()) {
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const requestData = 'secret=' + encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY) + '&' +
                          'response=' + encodeURIComponent(data['g-recaptcha-response']);
      utils.postJSON(url, {}, requestData, (parsedJSON) => {
        if (parsedJSON.success === true &&
            parsedJSON.score >= 0.7 &&
            parsedJSON.action === 'rate' &&
            parsedJSON.hostname === req.hostname) {
          return true;
        }
        return Promise.reject('Failed reCAPTCHA test.');
      })
      .then((success) => {
        boardModels.board.findOne({ uuid: data.uuid })
          .populate('raters')
          .lean()
          .exec()
          .then(function(board) {
            let pastRating = board.raters.find(
              (el) => { return el._id.toString() === req.session.loggedInAsId.toString(); }
            );
            if (!pastRating) {
              let avgN, N, N1, avgN1;
              if (board.rating) {
                avgN = board.rating;
                N = board.ratingsCompleted;
              } else {
                avgN = 0;
                N = 0;
              }
              N1 = N + 1;
              avgN1 = ((avgN * N) + parseFloat(data.rating)) / N1;
              board.rating = parseFloat(avgN1.toFixed(1));
              board.ratingsCompleted = N1;
              board.raters.push({ _id: mongoose.Types.ObjectId(req.session.loggedInAsId.toString()) });
              return boardModels.board.findByIdAndUpdate(
                board._id, 
                { rating: board.rating, ratingsCompleted: board.ratingsCompleted, raters: board.raters }
              ).exec();
            } else {
              return Promise.reject('Already rated.');
            }
          })
          .then(function(board) {
            return boardModels.board.findById(board._id.toString()).exec();
          })
          .then(function(board) {
            if (req.xhr) {
              res.status(200).json(board);
            } else {
              res.render('../tactics-board/views/confirm', {
                title: 'Tactics Board',
                success: 'Rating completed successfully!',
                back: 2
              });
            }
          })
          .catch(function(err) {
            if (err) {
              winston.logger.error(err);
            }
            if (req.xhr) {
              res.status(400).json(err);
            } else {
              res.render('../tactics-board/views/confirm', {
                title: 'Tactics Board',
                error: 'An error occurred while saving the rating. Please try again later.',
                back: 2
              });
            }
          });
      })
      .catch(function(err) {
        if (err) {
          winston.logger.error(err);
        }
        if (req.xhr) {
          res.status(400).json('Failed reCAPTCHA test.');
        } else {
          res.render('../tactics-board/views/confirm', {
            title: 'Tactics Board',
            error: 'An error occurred while saving the rating. Please try again later.',
            back: 2
          });
        }
      });
    } else {
      if (req.xhr) {
        res.status(400).json('Error.');
      } else {
        res.render('../tactics-board/views/confirm', {
          title: 'Tactics Board',
          error: 'An error occurred while saving the rating. Please try again later.',
          back: 2
        });
      }
    }
  }
];

exports.board_load_post = [
  body('id', 'Invalid ID.')
    .trim()
    .isLength({ min: 36, max: 36 })
    .matches(/^[A-Fa-f0-9\-]{36}$/)
    .whitelist('A-Fa-f0-9\\-')
    .escape(),
  body('g-recaptcha-response', 'Failed reCAPTCHA test.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_\-]+$/),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['body'] });
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const requestData = 'secret=' + encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY) + '&' +
                          'response=' + encodeURIComponent(data['g-recaptcha-response']);
      utils.postJSON(url, {}, requestData, (parsedJSON) => {
        if (parsedJSON.success === true &&
            parsedJSON.score >= 0.7 &&
            parsedJSON.action === 'load' &&
            parsedJSON.hostname === req.hostname) {
          return true;
        }
        return Promise.reject('Failed reCAPTCHA test.');
      })
      .then((success) => {
        boardModels.board.findOne({ uuid: data.id })
          .lean()
          .exec()
          .then(function(board) {
            if (req.xhr) {
              res.status(200).json(board);
            } else {
              res.render('../tactics-board/views/confirm', {
                title: 'Edit Tactics Board',
                success: 'Board loaded successfully!',
                back: 2
              });
            }
          })
          .catch(function(err) {
            if (err) {
              winston.logger.error(err);
            }
            if (req.xhr) {
              res.status(400).json(err);
            } else {
              res.render('../tactics-board/views/confirm', {
                title: 'Edit Tactics Board',
                error: 'An error occurred while loading the board. Please try again later.',
                back: 2
              });
            }
          });
      })
      .catch(err => handleLoadError(err, 'Failed reCAPTCHA test.'));
    } else {
      if (req.xhr) {
        res.status(400).json(errors.array({ onlyFirstError: true }));
      } else {
        res.render('../tactics-board/views/confirm', {
          title: 'Edit Tactics Board',
          error: 'An error occurred while loading the board. Please try again later.',
          back: 2
        });
      }
    }
    function handleLoadError(err, msg) {
      errors = errors.array({ onlyFirstError: true });
      errors.push({
        param: 'load',
        msg: msg
      });
      if (err) {
        winston.logger.error(err);
      }
      if (req.xhr) {
        res.status(400).json(errors);
      } else {
        res.render('../tactics-board/views/confirm', {
          title: 'Edit Tactics Board',
          error: 'An error occurred while loading the board. Please try again later.',
          back: 2
        });
      }
    }
  }
];

exports.board_delete_get = [
  param('uuid', 'Invalid UUID.')
    .trim()
    .isLength({ min: 36, max: 36 })
    .matches(/^[A-Fa-f0-9\-]{36}$/)
    .whitelist('A-Fa-f0-9\\-')
    .escape(),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['params'] });
    if (!req.session.loggedInAs || !req.session.loggedInAsId) {
      res.redirect('/website/account/login');
    } else {
      res.render('../tactics-board/views/deleteboard', {
        title: 'Delete Tactics Board',
        id: data.uuid,
        back: 2
      });
    }
  }
];

exports.board_delete_post = [
  param('uuid', 'Invalid ID.')
    .trim()
    .isLength({ min: 36, max: 36 })
    .matches(/^[A-Fa-f0-9\-]{36}$/)
    .whitelist('A-Fa-f0-9\\-')
    .escape(),
  body('dPhone', 'Must be a boolean.')
    .trim()
    .escape()
    .isIn(['true', 'false'])
    .isBoolean()
    .toBoolean({ strict: true }),
  body('time', 'Invalid value.')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt()
    .toInt(10),
  body('dEmail', 'Invalid value.')
    .trim()
    .escape()
    .isEmpty(),
  body('g-recaptcha-response', 'Failed reCAPTCHA test.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_\-]+$/),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['body', 'params'] });
    let errors = validationResult(req);
    if (!req.session.loggedInAs || !req.session.loggedInAsId) {
      res.redirect('/website/account/login');
    } else if (errors.isEmpty()) {
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const requestData = 'secret=' + encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY) + '&' +
                          'response=' + encodeURIComponent(data['g-recaptcha-response']);
      utils.postJSON(url, {}, requestData, (parsedJSON) => {
        if (parsedJSON.success === true &&
            parsedJSON.score >= 0.7 &&
            parsedJSON.action === 'delete' &&
            parsedJSON.hostname === req.hostname) {
          return true;
        }
        return Promise.reject('Failed reCAPTCHA test.');
      })
      .then((success) => {
        boardModels.board.findOneAndDelete({ uuid: data.uuid, owner: req.session.loggedInAs }).exec()
          .then(function(match) {
            res.redirect(BASEPATH + '/delete/confirm');
          })
          .catch(err => handleDeleteError(err, 'An error occurred while deleting the board. Please try again later.'));
      })
      .catch(err => handleDeleteError(err, 'Failed reCAPTCHA test.'));
    } else {
      res.render('../tactics-board/views/confirm', {
        title: 'Delete Tactics Board',
        error: 'An error occurred while deleting the board. Please try again later.',
        back: 2
      });
    }
    function handleDeleteError(err, msg) {
      errors = errors.array({ onlyFirstError: true });
      errors.push({
        param: 'delete',
        msg: msg
      });
      if (err) {
        winston.logger.error(err);
      }
      res.render('../tactics-board/views/confirm', {
        title: 'Delete Tactics Board',
        error: 'An error occurred while deleting the board. Please try again later.',
        back: 2
      });
    }
  }
];

exports.board_delete_confirm_get = function(req, res, next) {
  res.render('../tactics-board/views/confirm', {
    title: 'Delete Tactics Board',
    success: 'Board deleted successfully!',
    back: 2
  });
};

exports.board_save_post = [
  body('uuid', 'Invalid UUID.')
    .trim()
    .isLength({ min: 36, max: 36 })
    .matches(/^[A-Fa-f0-9\-]{36}$/)
    .whitelist('A-Fa-f0-9\\-')
    .escape()
    .optional({ checkFalsy: true }),
  body('title', 'Must not be empty. Can contain A-Z, a-z, 0-9, spaces, and _.,?!-.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 _,!.?-]{1,50}$/)
    .whitelist('A-Za-z0-9 _,!.?\\-')
    .escape(),
  body('public', 'Must be boolean.')
    .trim()
    .escape()
    .isBoolean({ loose: true })
    .toBoolean(),
  body('field', 'Must be among soccer, basketball, american football.')
    .trim()
    .isIn(['Soccer', 'Basketball', 'American Football'])
    .escape(),
  body('players.*.id', 'Must be numeric.')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt(),
  body('players.*.team', 'Must be among 1, 2, Ball.')
    .trim()
    .isIn(['1', '2', 'Ball'])
    .escape(),
  body('players.*.color', 'Must be #XXXXXX.')
    .trim()
    .isHexColor()
    .escape(),
  body('players.*.number', 'Must be from 0 to 99.')
    .trim()
    .escape()
    .isLength({ min: 0, max: 2 })
    .matches(/^[0-9]{0,2}$/)
    .whitelist('0-9'),
  body('players.*.name', 'Can contain A-Z, a-z, spaces, \', and -.')
    .trim()
    .isLength({ min: 0, max: 50 })
    .matches(/^[A-Za-z \-']{0,50}$/)
    .whitelist('A-Za-z \\-\''),
  body('players.*.path.*.x', 'Must be from 0 to 1.')
    .trim()
    .escape()
    .isFloat({ min: 0, max: 1 }),
  body('players.*.path.*.y', 'Must be from 0 to 1.')
    .trim()
    .escape()
    .isFloat({ min: 0, max: 1 }),
  body('players.*.speed.*.val', 'Must be from 0 to 99.9.')
    .trim()
    .escape()
    .isFloat({ min: 0, max: 99.9 }),
  body('players.*.speed.*.wait', 'Must be from 0 to 99900.')
    .trim()
    .escape()
    .isFloat({ min: 0, max: 99900 }),
  body('players.*.current.step', 'Must be from 0 to 99900.')
    .trim()
    .escape()
    .isFloat({ min: 0, max: 99900 }),
  body('players.*.current.position.x', 'Must be from 0 to 1.')
    .trim()
    .escape()
    .isFloat({ min: 0, max: 1 }),
  body('players.*.current.position.y', 'Must be from 0 to 1.')
    .trim()
    .escape()
    .isFloat({ min: 0, max: 1 }),
  body('players.*.current.wait', 'Must be from 0 to 99900.')
    .trim()
    .escape()
    .isFloat({ min: 0, max: 99900 }),
  body('time', 'Invalid value.')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt()
    .toInt(10),
  body('g-recaptcha-response', 'Failed reCAPTCHA test.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_\-]+$/),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['body'] });
    let errors = validationResult(req);
    let pastTime = utils.pastTimeFrame(data.time, 2);
    if (!req.session.loggedInAs || !req.session.loggedInAsId) {
      if (req.xhr) {
        errors = errors.array({ onlyFirstError: true });
        errors.push({
          param: 'save',
          msg: 'Not logged in.'
        });
        res.status(401).json(errors);
      } else {
        res.redirect('/website/account/login');
      }
    } else if (errors.isEmpty() && pastTime) {
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const requestData = 'secret=' + encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY) + '&' +
                          'response=' + encodeURIComponent(data['g-recaptcha-response']);
      utils.postJSON(url, {}, requestData, (parsedJSON) => {
        if (parsedJSON.success === true &&
            parsedJSON.score >= 0.7 &&
            parsedJSON.action === 'save' &&
            parsedJSON.hostname === req.hostname) {
          return true;
        }
        return Promise.reject('Failed reCAPTCHA test.');
      })
      .then((success) => {
        let boardCount, existing;
        boardModels.board.countDocuments({ owner: req.session.loggedInAs }).exec()
          .then(function(count) {
            if (count) {
              boardCount = count;
            } else {
              boardCount = 0;
            }
            return boardModels.board.findOne({ uuid: data.uuid }).exec();
          })
          .then(function(board) {
            existing = board;
            return accountModels.userLevel.findOne({ user: req.session.loggedInAsId }).exec();
          })
          .then(function(user) {
            if ((!existing && ((boardCount + 1) > user.maxBoards)) || (existing && (boardCount > user.maxBoards))) {
              return Promise.reject(boardCount + 1);
            } else {
              user.experience = user.experience + 10;
              return user.save();
            }
          })
          .then(function(doc) {
            return boardModels.board.findOne({ uuid: data.uuid }).exec();
          })
          .then(function(board) {
            if (board) {
              board.title = data.title;
              board.public = data.public;
              board.field = data.field;
              board.updated = Date.now();
            } else {
              board = new boardModels.board({
                uuid: uuidv4(),
                title: data.title,
                public: data.public,
                owner: req.session.loggedInAs,
                updated: Date.now(),
                field: data.field,
              });
            }
            if (data.players) {
              board.players = data.players;
            } else {
              board.players = [];
            }
            return board.save();
          })
          .then(function(doc) {
            if (req.xhr) {
              res.status(200).json(doc.uuid);
            } else {
              res.redirect(BASEPATH + '/save/confirm');
            }
          })
          .catch(function(err) {
            handleSaveError(err, 'An error occurred while saving the board. Please try again later.');
          });
      })
      .catch(err => handleSaveError(err, 'Failed reCAPTCHA test.'));
    } else {
      if (!pastTime) {
        handleSaveError(data.time, 'An error occurred while saving the board. Please try again later.');
      } else {
        if (req.xhr) {
          res.status(400).json('Save failed.');
        } else {
          res.render('../tactics-board/views/confirm', {
            title: 'Edit Tactics Board',
            error: 'An error occurred while saving the board. Please try again later.',
            back: 2
          });
        }
      }
    }
    function handleSaveError(err, msg) {
      if (err) {
        winston.logger.error(err);
      }
      if (typeof err === 'number') {
        msg = 'The maximum amount of boards has been reached.';
      }
      if (req.xhr) {
        res.status(400).json(msg);
      } else {
        res.render('../tactics-board/views/confirm', {
          title: 'Edit Tactics Board',
          error: 'An error occurred while saving the board. Please try again later.',
          back: 2
        });
      }
    }
  }
];

exports.board_save_confirm_get = function(req, res, next) {
  res.render('../tactics-board/views/confirm', {
    title: 'Edit Tactics Board',
    success: 'Board saved successfully!',
    back: 2
  });
};
