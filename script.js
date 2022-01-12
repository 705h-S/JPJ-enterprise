var refreshCount = 0;
function loadStorage() {
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
    console.log(data.quote);
    $("#qoute").text(data.quote).val();

    $('#save-button').on('click', function (event) {
      event.preventDefault();
      var quote = data.quote;
      var quoteKey = refreshCount;
      localStorage.setItem(quoteKey, quote)
      console.log(localStorage);
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

