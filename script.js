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

var saveBtn = $('#save-button');
console.log(saveBtn)
