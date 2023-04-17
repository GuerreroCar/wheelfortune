
/////// Construct objects ////////////
class Game {
  constructor(string, arr, num){
    this.questionText = string;
    this.answers = arr;
    this.correctAnswer = num;
  }
}

/////////////// Grabs the  Elements from HTML ///////////////
const question = document.getElementById('question');
const answers = document.getElementById('answers');
const next = document.getElementById('next');

////////// Instances of Question class //////////////
const question1 = new Game('What is the boxer Tyson\'s first name?', ['Mike', 'Jeff', 'Evander','Jayson'],0); 
const question2 = new Game('Who is the founder of Golden Boy Boxing?', ['Oscar De La Hoya','Cesar Chavez','Jerry Archie', 'Larry Flynn'], 0);
const question3 = new Game('Where did the 2020 Olympics take place?', ['Australia', 'Tokyo','United States','China'], 1);
const question4 = new Game('What is the heavy weight champion Muhammad last name?', ['White', 'Ali', 'Dexter', 'Obama'],1);
const question5 = new Game('Where is the Golden Boy Boxing Gym located?', ['Palm Springs', 'Temecula', 'Big Bear','Los Angeles'], 2);

////////// Stores all questions from the Game questions ////////
let questionBank = [question1, question2, question3, question4, question5];



//////////// Random functions //////////////
const randNum = () => Math.floor(Math.random() * questionBank.length);
const randQuest = () => questionBank[randNum()];

/////////// Generate next random questions ///////////
next.addEventListener('click', function(){
  if(questionBank.length === 0 ) {
    this.style.display = 'none'
    displayEnd()
  }else setQuestions();
  
})

/////// Generate random questions on page load /////
window.onload = setQuestions()

///////// Sets random questions /////////////
function setQuestions(){
  const infoQuestion = randQuest();

  /////////// Clear list items /////////////
  $(answers).children().remove()

  question.innerText = infoQuestion.questionText;

  ////////// Sets information from random questions ////////
  infoQuestion.answers.map((val, idx) => {
    const li = document.createElement('li');
    li.innerText = val;
    li.className = 'answer li-items'
    li.id = idx;

    /////////// Check for right or wrong answer //////////
    li.addEventListener('click', function (){
      if($(answers).children().hasClass('active')) {
        return false
      } // It returns false code below will not run /////////
      if(Number.parseInt(this.id) === infoQuestion.correctAnswer){
        this.className = 'correctAnswer li-items active'
        displayMessage('That is correct!', 'correctAnswer')
      }else {
        this.className = 'wrong li-items active'
        displayMessage("Sorry, that's incorrect!", 'wrong')
      }       
      $(answers).children().not(this).off()
      questionBank = questionBank.filter(bank => bank.questionText !== infoQuestion.questionText)
    })
    answers.append(li);
  })
  questionsLeftUnanwered()
}

////////////// Displays user message ////////////
function displayMessage(msg, className){
  const note = document.getElementById('message');
  note.className = className;
  note.textContent = '';
  note.innerText = msg;
  
}

///////////// Display and keep track of questions left ///////
function questionsLeftUnanwered(){
  const track = document.getElementById('unanswered');
  track.innerText = `${questionBank.length} unanswered questions left!`
  displayMessage('')
  if (questionBank.length === 0) displayEnd()

}

/////////////// Displays message End of Game  ////////////////
function displayEnd(){
  const window = document.getElementById('windowEnd-message');
  $(window).children().remove()
  window.innerHTML = `
  <h1>GAME OVER</h1>
  <h2>Refresh to start over</h2>
  `
}