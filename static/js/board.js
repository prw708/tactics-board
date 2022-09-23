import * as Vue from 'vue';
import DOMPurify from 'dompurify';
import { initTooltips } from './main'
import TacticsBoard from './TacticsBoard.common';

var app = Vue.createApp({
  render() {
    var messageDiv;
    if (this.successMessage) {
      messageDiv = Vue.h('div', { class: 'alert alert-success px-4 mb-0' }, this.successMessage);
    }
    if (this.errorMessage) {
      messageDiv = Vue.h('div', { class: 'alert alert-danger px-4 mb-0' }, this.errorMessage);
    }
    return [
      messageDiv,
      Vue.h(TacticsBoard, { 
        onSendData: this.SendData, 
        loadedData: this.loadedData, 
        viewOnly: this.viewOnly,
        loadLoading: this.loadLoading,
        saveLoading: this.saveLoading,
      }, null),
    ];
  },
  data() {
    return {
      successMessage: '',
      errorMessage: '',
      loadedData: null,
      viewOnly: null,
      loadLoading: false,
      saveLoading: false,
      savedId: '',
    }
  },
  methods: {
    getTime() {
      return document.querySelector('meta[name="time-of-load"]').getAttribute('content');
    },
    getCSRF() {
      return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    },
    getId() {
      return document.querySelector('#app').getAttribute('data-id');
    },
    getRecaptchaSiteKey() {
      return document.querySelector('#app').getAttribute('data-recaptchaSiteKey');
    },
    getViewOnly() {
      return document.querySelector('#app').getAttribute('data-viewOnly') === '1';
    },
    SendData(data) {
      this.saveLoading = true;
      if (data) {
        if (this.savedId) {
          data.uuid = DOMPurify.sanitize(this.savedId);
        } else {
          data.uuid = DOMPurify.sanitize(this.getId());
        }
        data.title = DOMPurify.sanitize(data.title);
        data.public = data.public;
        data.field = DOMPurify.sanitize(data.field);
        for (var i = 0; i < data.players.length; i++) {
          data.players[i].id = DOMPurify.sanitize(data.players[i].id);
          data.players[i].team = DOMPurify.sanitize(data.players[i].team);
          data.players[i].color = DOMPurify.sanitize(data.players[i].color);
          data.players[i].number = DOMPurify.sanitize(data.players[i].number);
          data.players[i].name = DOMPurify.sanitize(data.players[i].name);
          for (var j = 0; j < data.players[i].path; j++) {
            data.players[i].path[j].x = DOMPurify.sanitize(data.players[i].path[j].x);
            data.players[i].path[j].y = DOMPurify.sanitize(data.players[i].path[j].y);
          }
          for (var k = 0; k < data.players[i].speed; k++) {
            data.players[i].speed[k].val = DOMPurify.sanitize(data.players[i].speed[k].val);
            data.players[i].speed[k].wait = DOMPurify.sanitize(data.players[i].speed[k].wait);
          }
          if (data.players[i].path) {
            data.players[i].current = { step: 0, position: data.players[i].path[0], wait: 0 };
          } else {
            data.players[i].current = { step: 0, position: { x: 0, y: 0 }, wait: 0 };
          }
        }
        data.time = DOMPurify.sanitize(this.getTime());
      } else {
        data = {};
      }
      var context = this;
      var httpRequest = new XMLHttpRequest();
      if (!httpRequest) {
        return null;
      }
      grecaptcha.ready(function() {
        grecaptcha.execute(DOMPurify.sanitize(context.getRecaptchaSiteKey()), { action: 'save' })
        .then(function(recaptchaToken) {
          data['g-recaptcha-response'] = DOMPurify.sanitize(recaptchaToken);
          httpRequest.open('POST', '/projects/tactics-board/save', true);
          httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
          httpRequest.setRequestHeader('CSRF-Token', DOMPurify.sanitize(context.getCSRF()));
          httpRequest.send(JSON.stringify(data));
        });
      });
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            context.savedId = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
            context.saveLoading = false;
            context.successMessage = 'Board saved successfully!';
            context.errorMessage = null;
          } else {
            context.saveLoading = false;
            context.successMessage = null;
            context.errorMessage = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
          }
        }
      }
    },
    LoadData() {
      this.loadLoading = true;
      this.viewOnly = this.getViewOnly();
      var context = this;
      var id = this.getId();
      return new Promise(function(resolve, reject) {
        if (id !== '') {
          var data = {
            id: DOMPurify.sanitize(context.getId()),
          };
          var httpRequest = new XMLHttpRequest();
          if (!httpRequest) {
            return null;
          }
          grecaptcha.ready(function() {
            grecaptcha.execute(DOMPurify.sanitize(context.getRecaptchaSiteKey()), { action: 'load' })
            .then(function(recaptchaToken) {
              data['g-recaptcha-response'] = DOMPurify.sanitize(recaptchaToken);
              httpRequest.open('POST', '/projects/tactics-board/load', true);
              httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
              httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
              httpRequest.setRequestHeader('CSRF-Token', DOMPurify.sanitize(context.getCSRF()));
              httpRequest.send(JSON.stringify(data));
            });
          });
          httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
              if (httpRequest.status === 200) {
                var response = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
                if (context.validateTitle(response) && 
                    (response.public === true || response.public === false) &&
                    context.validateField(response) && 
                    context.validatePlayers(response)) {
                  context.loadedData = response;
                  context.loadLoading = false;
                  resolve(response);
                } else {
                  context.loadedData = null;
                  context.loadLoading = false;
                  reject(null);
                }
              } else {
                context.loadedData = null;
                reject(null);
              }
            }
          }
        } else {
          context.loadLoading = false;
          reject(null);
        }
      });
    },
    validateTitle(response) {
      if (!response) {
        return false;
      }
      if (/^[A-Za-z0-9 _,!.?"'-]{1,50}$/.test(response.title)) {
        return true;
      }
      return false;
    },
    validateField(response) {
      var fields = ['Soccer', 'Basketball', 'American Football'];
      for (var i = 0; i < fields.length; i++) {
        if (response.field === fields[i]) {
          return true;
        }
      }
      return false;
    },
    validatePlayers(response) {
      var valid = false;
      if (response.players.length === 0) {
        valid = true;
      }
      for (var i = 0; i < response.players.length; i++) {
        if (/^[0-9]+$/.test(response.players[i].id.toString())) {
          valid = true;
        } else {
          return false;
        }
        if (response.players[i].team === '1' ||
            response.players[i].team === '2' ||
            response.players[i].team === 'Ball') {
          valid = true;
        } else {
          return false;
        }
        if (/^#[A-Fa-f0-9]{6}$/.test(response.players[i].color)) {
          valid = true;
        } else {
          return false;
        }
        if (/^[0-9]{0,2}$/.test(response.players[i].number)) {
          valid = true;
        } else {
          return false;
        }
        if (/^[A-Za-z \-']{0,50}$/.test(response.players[i].name)) {
          valid = true;
        } else {
          return false;
        }
        if (parseFloat(response.players[i].current.step) >= 0 &&
            parseFloat(response.players[i].current.step) <= 99900) {
          valid = true;
        } else {
          return false;
        }
        if (parseFloat(response.players[i].current.wait) >= 0 &&
            parseFloat(response.players[i].current.wait) <= 99900) {
          valid = true;
        } else {
          return false;
        }
        if (parseFloat(response.players[i].current.position.x) >= 0 && 
            parseFloat(response.players[i].current.position.x) <= 1 &&
            parseFloat(response.players[i].current.position.y) >= 0 && 
            parseFloat(response.players[i].current.position.y) <= 1) {
          valid = true;
        } else {
          return false;
        }
        for (var k = 0; k < response.players[i].path.length; k++) {
          if (parseFloat(response.players[i].path[k].x) >= 0 && 
              parseFloat(response.players[i].path[k].x) <= 1 &&
              parseFloat(response.players[i].path[k].y) >= 0 && 
              parseFloat(response.players[i].path[k].y) <= 1) {
            valid = true;
          } else {
            return false;
          }
        }
        for (var l = 0; l < response.players[i].speed.length; l++) {
          if (parseFloat(response.players[i].speed[l].val) >= 0 && 
              parseFloat(response.players[i].speed[l].val) <= 99.9 &&
              parseFloat(response.players[i].speed[l].wait) >= 0 && 
              parseFloat(response.players[i].speed[l].wait) <= 99900) {
            valid = true;
          } else {
            return false;
          }
        }
      }
      return valid;
    },
  },
  mounted() {
    this.LoadData()
      .then(function(doc) {
        initTooltips();
      })
      .catch(function(err) {
        initTooltips();
      });
  }
});
app.mount('#app');
