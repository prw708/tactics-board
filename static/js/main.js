import DOMPurify from 'dompurify';

window.addEventListener("load", setup, false);

function setup() {
  starHover();
  initTooltips();
}

function initTooltips() {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

function deleteBoardSubmit(token) {
  document.getElementById("4-2-form").submit();
}

function getRating(index) {
  var ratings = document.querySelectorAll('.col-sm-7.mb-sm-0.rating');
  var rating = ratings[index].textContent.substring(0, ratings[index].textContent.indexOf('/')).trim();
  if (rating && rating !== '-') {
    rating = parseFloat(rating);
  } else {
    rating = 0;
  }
  return rating;
}

function starHover() {
  var starDiv = document.querySelectorAll('.stars.mb-4');
  for (var i = 0; i < starDiv.length; i++) {
    var stars = starDiv[i].querySelectorAll('.star');
    for (var j = 0; j < stars.length; j++) {
      stars[j].addEventListener('mouseover', function(event) {
        var starDiv = event.target.parentNode;
        var stars = starDiv.querySelectorAll('.star');
        var starDivs = document.querySelectorAll('.stars.mb-4');
        var rating = 0;
        if (starDivs) {
          for (var a = 0; a < starDivs.length; a++) {
            if (starDivs[a].contains(event.target)) {
              rating = getRating(a);
              break;
            }
          }
        }
        for (var b = 0; b < stars.length; b++) {
          stars[b].className = "star star-icon";
        }
        for (var c = 1; c <= stars.length; c++) {
          for (var k = 1; k <= c; k++) {
            if (rating <= c) {
              stars[k - 1].className = "star star-fill-icon";
            } else {
              stars[k - 1].className = "star star-icon";
            }
            if (stars[k - 1].contains(event.target)) {
              break;
            }
          }
        }
      }, false);
      stars[j].addEventListener('mouseout', function(event) {
        var starDiv = event.target.parentNode;
        var stars = starDiv.querySelectorAll('.star');
        var starDivs = document.querySelectorAll('.stars.mb-4');
        var rating = 0;
        if (starDivs) {
          for (var a = 0; a < starDivs.length; a++) {
            if (starDivs[a].contains(event.target)) {
              rating = getRating(a);
              break;
            }
          }
        }
        for (var b = 0; b < stars.length; b++) {
          stars[b].className = "star star-icon";
        }
        for (var c = 1; c <= stars.length; c++) {
          for (var k = 1; k <= c; k++) {
            if ((rating - k + 1) >= 0.5 && (rating - k + 1) < 1) {
              stars[k - 1].className = "star star-half-icon";
            } else if (rating >= k) {
              stars[k - 1].className = "star star-fill-icon";
            } else {
              stars[k - 1].className = "star star-icon";
            }
          }
        }
      }, false);
      stars[j].addEventListener('click', function handleClick(event) {
        var stars = event.target.parentNode.querySelectorAll('.star-fill-icon');
        var k = stars.length;
        var uuid = event.target.parentNode.parentNode.querySelector('.col-sm-7.mb-sm-0.rating').id;
        uuid = uuid.substring(uuid.indexOf('_') + 1);
        var token, recaptchaSiteKey;
        try {
          token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
          recaptchaSiteKey = document.querySelector(`#preview_${uuid}`).getAttribute('data-recaptchaSiteKey');
        } catch (e) {
          token = '';
          recaptchaSiteKey = '';
        }
        var httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
          return null;
        }
        grecaptcha.ready(function() {
          grecaptcha.execute(DOMPurify.sanitize(recaptchaSiteKey), { action: 'rate' })
          .then(function(recaptchaToken) {
            httpRequest.open('POST', '/projects/tactics-board/rate', true);
            httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            httpRequest.setRequestHeader('CSRF-Token', DOMPurify.sanitize(token));
            httpRequest.send(encodeURIComponent('rating') + '=' + encodeURIComponent(DOMPurify.sanitize(k)) + '&' +
              encodeURIComponent('uuid') + '=' + encodeURIComponent(DOMPurify.sanitize(uuid)) + '&' + 
              encodeURIComponent('g-recaptcha-response') + '=' + encodeURIComponent(DOMPurify.sanitize(recaptchaToken))
            );
          });
        });
        httpRequest.onreadystatechange = function() {
          if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
              var board = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
              if (board.ratingsCompleted === 1) {
                document.getElementById(`rating_${board.uuid}`).textContent = `${board.rating} / 5`;
                document.getElementById(`ratingsCount_${board.uuid}`).textContent = `${board.ratingsCompleted} rating`;
              } else {
                document.getElementById(`rating_${board.uuid}`).textContent = `${board.rating} / 5`;
                document.getElementById(`ratingsCount_${board.uuid}`).textContent = `${board.ratingsCompleted} ratings`;
              }
              var starDiv = document.getElementById(`rating_${board.uuid}`).parentNode.parentNode.querySelector('.stars.mb-4');
              var stars = starDiv.querySelectorAll('.star');
              var rating = parseFloat(board.rating);
              for (var a = 0; a < stars.length; a++) {
                stars[a].className = "star star-icon";
              }
              for (var b = 1; b <= stars.length; b++) {
                for (var k = 1; k <= b; k++) {
                  if ((rating - k + 1) >= 0.5 && (rating - k + 1) < 1) {
                    stars[k - 1].className = "star star-half-icon";
                  } else if (rating >= k) {
                    stars[k - 1].className = "star star-fill-icon";
                  } else {
                    stars[k - 1].className = "star star-icon";
                  }
                }
              }
            } else {
              var desc = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
              document.getElementById(`rating_${uuid}`).parentNode.parentNode.querySelector('.stars.desc').textContent = desc;
            }
          }
        }
      }, false);
    }
  }
}

window.deleteBoardSubmit = deleteBoardSubmit;

export {
  initTooltips
};
