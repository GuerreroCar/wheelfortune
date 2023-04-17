// Grabs the new user count and appends it to the home page
$.get('/count').then((data) => {
    $('#totalMatches').text(data.length); 
    console.log(data)
})