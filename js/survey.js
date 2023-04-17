// Sets the users information
let user = {
  name  : '',
  photo : '',
  scores: []
}

// Grabs the input selection choices and disables the radio button
$('input[type="radio"][name="select1"]').click(function() {
  let selectVal = this.value;
  let radioName = "select1"; 
  $('input[name="' + radioName + '"]:not(:checked)').attr("disabled", true); 
  console.log(selectVal)
  user.scores.push(selectVal)
});

$('input[type="radio"][name="select2"]').click(function() {
  let selectVal = this.value;
  let radioName = "select2"; 
  $('input[name="' + radioName + '"]:not(:checked)').attr("disabled", true); 
  console.log(selectVal)
  user.scores.push(selectVal)
});

$('input[type="radio"][name="select3"]').click(function() {
  let selectVal = this.value;
  let radioName = "select3"; 
  $('input[name="' + radioName + '"]:not(:checked)').attr("disabled", true); 
  console.log(selectVal)
  user.scores.push(selectVal)
});
$('input[type="radio"][name="select4"]').click(function() {
  let selectVal = this.value;
  let radioName = "select4"; 
  $('input[name="' + radioName + '"]:not(:checked)').attr("disabled", true); 
  console.log(selectVal)
  user.scores.push(selectVal)
});

$('input[type="radio"][name="select5"]').click(function() {
  let selectVal = this.value;
  let radioName = "select5"; 
  $('input[name="' + radioName + '"]:not(:checked)').attr("disabled", true); 
  console.log(selectVal)
  user.scores.push(selectVal)
});

$('input[type="radio"][name="select6"]').click(function() {
  let selectVal = this.value;
  let radioName = "select6"; 
  $('input[name="' + radioName + '"]:not(:checked)').attr("disabled", true); 
  console.log(selectVal)
  user.scores.push(selectVal)
});

$('input[type="radio"][name="select7"]').click(function() {
  let selectVal = this.value;
  let radioName = "select7"; 
  $('input[name="' + radioName + '"]:not(:checked)').attr("disabled", true); 
  console.log(selectVal)
  user.scores.push(selectVal)
});

$('input[type="radio"][name="select8"]').click(function() {
  let selectVal = this.value;
  let radioName = "select8"; 
  $('input[name="' + radioName + '"]:not(:checked)').attr("disabled", true); 
  console.log(selectVal)
  user.scores.push(selectVal)
});

$('input[type="radio"][name="select9"]').click(function() {
  let selectVal = this.value;
  let radioName = "select9"; 
  $('input[name="' + radioName + '"]:not(:checked)').attr("disabled", true); 
  console.log(selectVal)
  user.scores.push(selectVal)
});

$('input[type="radio"][name="select10"]').click(function() {
  let selectVal = this.value;
  let radioName = "select10"; 
  $('input[name="' + radioName + '"]:not(:checked)').attr("disabled", true); 
  console.log(selectVal)
  user.scores.push(selectVal)
});

// Submitt button with post setting the users information
$('#matchform').on('submit', (e) => {
  e.preventDefault()
  const userName = $('#userName').val()
  const userPic   = $('#userPic').val()
  user.name = userName
  user.photo = userPic

  // Grabs the post to the api on survery form and renders mathched data
  $.ajax({
    type:"POST",
    url: '/api-people',
    data: user,
    success: function(data){
       // $('body').show()
      // $('.container').replaceWith(data)
      // Renders the matched friend on the survey page
      let html = '<h2 class = "text-center mt-5 text-info">Matched Result</h2>'
      //Holds the user data need to renders it to the survey page
      html += `<div>${data}</div>`
      document.getElementById('results').innerHTML = html
    },
    error: function(error){
      console.log(error)
    }
  })
})

