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

function getQuote() {
  $.ajax({
    url: 'https://api.kanye.rest/',
    method: "GET"
  }).then(function (data) {
    //console.log(data.quote);
    $("#qoute").text(data.quote).val();
    var quote = data.quote;

    // { make this an onclick function for the translate button
    $('#translateBtn').on('click', function () {
      languageRaw = document.querySelector('#langBar');
      language = languageRaw.options[languageRaw.selectedIndex].value;
      console.log(language);
      console.log(quote);

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
        console.log(response);
        var translatedBox = $('#translated-txt');
        console.log(response.data.translations[0].translatedText)
        translatedBox.text(response.data.translations[0].translatedText)
      });
    })

    //}

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


