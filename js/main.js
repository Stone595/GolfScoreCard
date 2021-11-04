class Player{
  constructor(name, score, handicap, totalScore){
    this.name = name; 
    this.score = score;
    this.handicap = 0; 
    this.totalScore = 0;
  }
}
//variables 

let course;
let tees; 
let holes; 
let numOfPlayers;
let players = [];
let api = 'http://golf-courses-api.herokuapp.com/courses/';

// get course object from api 
// var courseObj; 
// fetch(api)
//   .then(res => res.json())
//   .then(data => courseObj = data)
//   .then(() => console.log(courseObj))

// console.log(courseObj)

// async function getCourseObj() {
//   const response = await fetch(api);
//   const exam = await response.json();
//   return exam;
// }
// let obj = getCourseObj();
// console.log(obj)


function getCourseData() {
  return fetch(api).then(
    (response) => response.json()
  );
}
let coursePromise = getCourseData();

// this is where you have acess to the data from the object 
coursePromise.then((data) => {
  console.log(data.courses[1].name)
  console.log(data.courses)
  let coursesDrop = document.getElementById('#avCourses');
  for (let i = 0; i < data.courses.length; i++) {
    
    coursesDrop += `<button onclick="setCourse()">${data.courses[i].name}</button>`
    
  }




})









// display them on the avalible courses


// // get the course data object 
 function getCourseData() {
   return fetch('https://golf-courses-api.herokuapp.com/courses/' )
    .then(response => response.json())
    // .then(json => document.getElementById('#avCourses').appendChild(`<button onclick="setCourse()">${json.courses[i].name}</button>`))
 }
// //  getCourseData(18300);
// courseObj = getCourseData(18300);
// console.log(courseObj)


function amountOfPlayers(x) {
  //empty the area
  numOfPlayers = x; 
  $('#formArea').empty();

  //load the input form 
  for (let i = 1; i < x+1; i++) {
    $('#formArea').append(`
    <div>
        <label for="lname">Player ${i}</label>
        <input type="text" id="player${i}" name="lname">
      </div>
    `);
  };
}


//get the course 
function coursePlaying(course1) {
  course = course1; 
  console.log(course)
}

//holes
function getHoles(holes1) {
  holes = holes1;
  console.log(holes)
}


//this is where you display the actual score card
//
// to do 
function displayTopHears() {
  // create a function to display the yards per hole blue, black, red

  // create a function  to put in the handicap 

  // create a function for par on each hole 
  // for (let i = 0; i < holes ; i++) {
  //   $('#holes').append(`<td>${i + 1}</td>`)
  // }

  // create a function to populate the input boxes
  console.log('working')
  console.log(players, players.length)
  for (let i = 0; i < players.length; i++) {
    $(`#player${i}`).append(`
     <td data-scoreInput class="scoreInput"><input type="number"></td>
    `);
    
  }
  // onchange for the input buttons


  
}
function addUpScore(player) {
  // i could give each a class and then do a get all classes and then loop through them and get the value of the box and then add them up in the function
  


}
// for the holes <th scope="col">11</th> and then at the end  <th scope="col">Out</th>

// for the holes <td id='hole1Yds'>666yds</td>

// <td >1</td> for the handicap 

//Start The Round 
function startRound() {
  //get playerNames
  for (let i = 1; i < numOfPlayers+1; i++) {
    console.log("player",i)
    let name = document.getElementById(`player${i}`).value; 
    console.log(name)
    let player = new Player(`${name}`, 0)
    players.push(player)
  }
  console.log(players)
  //delete the screen
  $('.EnterContainer').empty(); 
  $('.EnterContainer').remove();


  $('body').append(`
  <div class="scoreCard">
  <table class="table table table-bordered">
    <thead>
      <tr id="holes">
        <th scope="col">Holes</th>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
      </tr>
    </thead>
    <tbody>
      <tr id="blackYards">
        <th scope="row">black</th>
        
  
      </tr>
      <tr id="blueYards">
        <th scope="row">Blue</th>
        
      </tr>
      <tr id="whiteYards">
        <th scope="row">white</th>
      </tr>
      <tr>
        <th scope="row">handicap</th>
        <!-- <td >1</td> -->
        
      </tr>
      <tr id="player1">
        <th scope="row" id="playerName">Player Name</th>
        <td data-scoreInput class="scoreInput"><input type="number"></td>
      </tr>
      <tr id="parForHole">
        <th scope="row">Par</th>

      </tr>
    </tbody>
  </table>
</div>
  `);

displayTopHears();

}
//adds all your score to the total- have it add up all of them each time since it is a small amount of numbers


//updates the total onto screen 


//checks your score at the end and then alerts the message















