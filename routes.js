const express = require('express');
const router = express.Router();

const Board_Controller = require('./controllers/board.js');

router.get('/', Board_Controller.home_get);
router.get('/myboards', Board_Controller.my_boards_get);

router.post('/rate', Board_Controller.board_rate_post);
router.get('/view/:uuid', Board_Controller.board_view_get);
router.get('/edit', Board_Controller.board_create_get);
router.get('/edit/:uuid', Board_Controller.board_edit_get);
router.post('/load', Board_Controller.board_load_post);
router.get('/delete/confirm', Board_Controller.board_delete_confirm_get);
router.get('/delete/:uuid', Board_Controller.board_delete_get);
router.post('/delete/:uuid', Board_Controller.board_delete_post);

router.post('/save', Board_Controller.board_save_post);
router.get('/save/confirm', Board_Controller.board_save_confirm_get);

module.exports = router;
