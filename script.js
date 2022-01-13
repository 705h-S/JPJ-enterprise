var refreshCount = 0;
function loadStorage() {
  $('#line').text('');
  for (var i = 0; i < localStorage.length; i++) {
    var listQuote = localStorage.getItem(i);
    var listEl = $('#line');
    if (localStorage.getItem(i) === null) {
    }
    else {
      listEl.append('<li><span class="bd-name">' + listQuote + '</span></li><br>')
    }
  }
}

$('#copy-button').on('click', function() {
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
      if(language === null) {
        var translatedBox = $('#translated-txt');
        translatedBox.text('Please select a language')
      }
      else{
      var btn = $(this);
      btn.prop('disabled', true);
      setTimeout(function () {
        btn.prop('disabled', false);
      }, 15000);

      var timer = 15;
      var stopInterval = 0;
      var timerSpan = $("#timer")
      if (stopInterval === 0) {
        timerFunction = setInterval(function () {
          timer--;
          timerSpan.text(timer)
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
    }})

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


