
$.ajax({
    url: 'https://api.kanye.rest/',
    method: "GET"
  }).then(function(data) {
    console.log(data.quote);
    $(".input").text(data.quote).val();
  })

