var previews = document.getElementsByClassName("preview");
for (var i = 0; i < previews.length; i++) {
  var previewId = previews[i].id;
  var app = Vue.createApp({
    render() {
      return [
        Vue.h(Preview, { 
          loadedData: this.loadedData, 
          viewOnly: this.viewOnly,
          loading: this.loading,
        }, null),
      ];
    },
    data() {
      return {
        loadedData: null,
        viewOnly: null,
        id: previewId,
        loading: false,
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
        return document.querySelector('#' + this.id).getAttribute('data-id');
      },
      getRecaptchaSiteKey() {
        return document.querySelector('#' + this.id).getAttribute('data-recaptchaSiteKey');
      },
      getViewOnly() {
        return document.querySelector('#' + this.id).getAttribute('data-viewOnly') === '1';
      },
      LoadData() {
        this.loading = true;
        this.viewOnly = this.getViewOnly();
        var id = this.getId();
        if (id !== '') {
          var context = this;
          var httpRequest = new XMLHttpRequest();
          if (!httpRequest) {
            return null;
          }
          grecaptcha.ready(function() {
            grecaptcha.execute(DOMPurify.sanitize(context.getRecaptchaSiteKey()), { action: 'load' })
            .then(function(recaptchaToken) {
              data = {
                id: DOMPurify.sanitize(context.getId()),
              };
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
                  context.loading = false;
                } else {
                  context.loadedData = null;
                  context.loading = false;
                }
              } else {
                context.loadedData = null;
                context.loading = false;
              }
            }
          }
        } else {
          this.loading = false;
        }
      },
      validateTitle(response) {
        if (!response) {
          return false;
        }
        if (/^[A-Za-z0-9 _,!.?-]{1,50}$/.test(response.title)) {
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
      this.LoadData();
    }
  });
  app.mount('#' + previewId);
}
