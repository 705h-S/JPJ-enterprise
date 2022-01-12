var refreshCount = 0;

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

$('#refresh-button').on('click', function () {
  getQuote();
  refreshCount++;
  console.log(refreshCount)
})

