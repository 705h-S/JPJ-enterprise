function getQuote() {
  $.ajax({
      url: 'https://api.kanye.rest/',
      method: "GET"
    }).then(function(data) {
      console.log(data.quote);
      $("#qoute").text(data.quote).val();
    })
}

getQuote();

var refreshBtn = $('#refresh-button') 
refreshBtn.on('click', function() {
  getQuote();
})

var refreshCount = 0;
var saveBtn = $('#save-button');
saveBtn.on('click', function(event) {
  event.preventDefault();
  var quote = $('#qoute');
  var quoteKey = refreshCount;
  localStorage.setItem(quoteKey, quote)
})
