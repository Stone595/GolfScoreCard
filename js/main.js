//variables 

let course;
let tees; 
let holes; 
let numOfPlayers;
let players = [];


//get golf course information from the api   use promise? 


class Player{
  constructor(name, score, handicap, totalScore){
    this.name = name; 
    this.score = score;
    this.handicap = 0; 
    this.totalScore = 0;
  }
}

//get the amount of players and their names;
function amountOfPlayers(x) {
  //empty the area
  let numOfPlayers = x; 
  $('#formArea').empty();

  //load the input form 
  for (let i = 1; i < x+1; i++) {
    $('#formArea').append(`
    <div>
        <label for="lname">Player ${i}</label>
        <input type="text" id="player${i} name="lname">
      </div>
    `);
  };

}


//get the course 
function coursePlaying(course1) {
  course = course1; 
  console.log(course)
}

//Tees
function getTees(tees1) {
  tees = tees1;
  console.log(tees)
}

//holes
function getHoles(holes1) {
  holes = holes1;
  console.log(holes)
}

//Start The Round 
function startRound() {
  //get playerNames

  //delete the screen
  $('.EnterContainer').empty(); 
  $('.EnterContainer').remove();
  
  // need to create all of the objects for the players



  
  //this is where you display the actual score card
  $('body').append(`
    <div>hello</div>
  `);
}
//adds all your score to the total- have it add up all of them each time since it is a small amount of numbers


//updates the total onto screen 


//checks your score at the end and then alerts the message















