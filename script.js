var refreshCount = 0;
function loadStorage() {
  $('#line').text('');
  for (var i = 0; i < localStorage.length; i++) {
    var listQuote = localStorage.getItem(i);
    var listEl = $('#line');
    if (localStorage.getItem(i) === null) {
    }
    else {
      listEl.append('<li><span class="bd-name has-background-grey-light has-text-black py-1">' + listQuote + '</span></li><br>')
    }
  }
}

$('#copy-button').on('click', function () {
  var tText = $('#translated-txt');
  tText.select();
  navigator.clipboard.writeText(tText.val())
})

function getQuote() {
  $.ajax({
    url: 'https://api.kanye.rest/',
    method: "GET"
  }).then(function (data) {
    $("#quote").text(data.quote).val();
    var quote = data.quote;

    $('#translateBtn').on('click', function () {
      languageRaw = $('#langBar');
      language = languageRaw.val();
      if (language === null) {
        var translatedBox = $('#translated-txt');
        translatedBox.text('Please select a language')
      }
      else {
        var btn = $('#translateBtn');
        btn.prop('disabled', true);
        setTimeout(function () {
          btn.prop('disabled', false);
        }, 10000);

        var timer = 10;
        var stopInterval = 0;
        if (stopInterval === 0) {


          var timerSpan = $("#timer")
          timerFunction = setInterval(function () {
            timer--;
            timerSpan.text(timer);
            if (timer <= 0) {
              clearInterval(stopInterval);
              timerSpan.text('')
            }
          }, 1000)
        }

        const settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
          "method": "POST",
          "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "accept-encoding": "application/gzip",
            "x-rapidapi-host": "google-translate1.p.rapidapi.com",
            "x-rapidapi-key": "efc296c17amsh2b92351a9d6aac9p10ae07jsn7e37b7e7e385"
          },
          "data": {
            "q": quote,
            "target": language,
            "source": "en"
          }
        };

        $.ajax(settings).done(function (response) {
          var translatedBox = $('#translated-txt');
          translatedBox.text(response.data.translations[0].translatedText)
        });
      }
    })

    $('#save-button').on('click', function (event) {
      event.preventDefault();
      var quote = data.quote;
      var quoteKey = refreshCount;
      localStorage.setItem(quoteKey, quote)
      console.log(localStorage);
      loadStorage()
    })

  })
}

getQuote();
loadStorage();

$('#refresh-button').on('click', function () {
  getQuote();
  refreshCount++;
  console.log(refreshCount)
})

$('#clear-btn').on('click', function () {
  localStorage.clear();
})


// js for modal 
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Main event
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    console.log($target);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });


});