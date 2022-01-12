function getQuote() {
  $.ajax({
      url: 'https://api.kanye.rest/',
      method: "GET"
    }).then(function(data) {
      console.log(data.quote);
      dataQuote = (data.quote);
      console.log(dataQuote)
      $("#qoute").text(data.quote).val();





    })
}

getQuote();

$('#refresh-button').on('click', function() {
  getQuote();
  refreshCount++;
  console.log(refreshCount)
})

var refreshCount = 0;
var saveBtn = $('#save-button');
saveBtn.on('click', function(event) {
  event.preventDefault();
  var quote = $('#qoute').val();
  var quoteKey = refreshCount;
  localStorage.setItem(quoteKey, quote)
  console.log(localStorage.getItem(1))
})
