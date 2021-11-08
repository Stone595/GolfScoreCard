
let numOfHoles;
let course; 
let numOfPlayers;
let players = [];
let courseId; 
let tees; 
let teeNumber;

function amountOfPlayers(x) {
  numOfPlayers = x; 
  //empty the area
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

// first page. Change the html to the holes they choe 
function getHoles(numberOfHoles) {
  numOfHoles = numberOfHoles
  document.getElementById('holesSelector').innerText = `Holes: ${numOfHoles}`
}

//First page. Display the tees they chose
function getTees(tees1) {
  if(tees1 == 'pro') {tees = 'pro'; teeNumber = 0;};
  if(tees1 == 'champion') {tees = 'champion'; teeNumber = 1;};
  if(tees1 == 'men') {tees = 'men'; teeNumber = 2;};
  if(tees1 == 'women') {tees = 'women'; teeNumber = 3;};
  document.getElementById('teeSelector').innerText = `Tees: ${tees}`
}

//display the avalible courses on first page
fetch(`http://golf-courses-api.herokuapp.com/courses`)
.then(response => response.json())
.then(json =>{
  let n1 = json.courses[0].name; 
  let n2 = json.courses[1].name; 
  let n3 = json.courses[2].name;
  $('#avCourses').append(`
  <button id="foxSelector"onclick="getCourseId('fox')">${n1}</button>
  <button id="thanksSelector"onclick="getCourseId('thanks')">${n2}</button>
  <button id="spanishSelector"onclick="getCourseId('spanish')">${n3}</button>
  `)
})

function getCourseId(name) {
  if(name == 'fox'){
    //fox Hallow
    course = 'Fox Hollow Golf course'
    courseId = 18300;
    document.getElementById('avCor').innerText = `Course: Fox Hollow`;
  } else if(name == 'thanks'){
    //thanksgiving
    course = 'Thanksgiving Point Golf Course'
    courseId = 11819;
    document.getElementById('avCor').innerText = `Course: Thanksgiving Point`;
  } else{
    //spanish
    course = 'Spanish Oaks Golf Course'
    courseId = 19002
    document.getElementById('avCor').innerText = `Course: Spanish Oaks`;
  }
}

//Get course data function
function getCourseData(id) {
  if(id){
    return fetch('http://golf-courses-api.herokuapp.com/courses/' + id)
    .then(response => response.json())
  } else{
    return fetch('http://golf-courses-api.herokuapp.com/courses/' )
      .then(response => response.json())
  }
}

//Start the round and
function startRound() {
  //get the names of the players and check to make sure its not used
  players = []
  for (let i = 1; i < numOfPlayers +1; i++) {
    let tempName = document.getElementById(`player${i}`).value;
    if(!players.includes(tempName)){
      players.push(tempName)
    } else{
      alert(`Cannot repeat names`)
      return
    }
  }
  //check to see if they chose a course and tee box
  if(!courseId) {alert('Must Choose a course'); return}
  if(!tees) {alert('Must Choose a tee box'); return}
  
  // // delete the html thats on the page
  $('.EnterContainer').empty(); 
  $('.EnterContainer').remove();
  
  //inject base scorecard
  document.body.innerHTML += `
  <div id="courseTitle" class="courseTitle">${course}</div>
  <div class="scoreCard">
    <table class="table table table-bordered">
      <thead id="appendHeaderData">
        <tr id="appendHoles"> 
          <th  data-holes scope="col">Holes</th>
        </tr>
        <tr id="appendHandi">
          <th scope="row">Handicap</th></tr>
        </tr>
        <tr id="parForHole">
          <th  scope="row">Par</th>
         </tr>
      </thead>

      <tbody id="headers">  
      </tbody>
    </table>
  </div>
  <button id="endRoundBtn" class="dropbtn" onClick="endGame()">END ROUND</button>`;

  //put in the amount of holes
  let holesSelector = document.getElementById('appendHoles');
  let holesHTML =``;
  let outCounter =0; 
  for (let i = 1; i < numOfHoles + 1; i++) {
    holesHTML += `<th scope="col">${i}</th>`
    if(i == 9 || i == 18){
      if(i === 9) outCounter += 1; 
      if(i === 18 ) outCounter +=1;
      holesHTML += `<th scope="col">Out</th>`
    }
  }
  holesHTML += `<th  scope="col">Total: </th>`
  holesSelector.innerHTML +=  holesHTML;

  // display the yardage for the tee boxes
  document.getElementById('appendHeaderData').innerHTML += `<tr id="yardages"> <th scope="row">${tees} Yds</th><tr>`
  
  // display the yardages, handicap, and par;
  getCourseData(courseId)
  .then(response => {
    for(let i = 0; i < numOfHoles; i++){
      if(i == 9){
        document.getElementById('yardages').innerHTML += `<td></td>`
        document.getElementById('appendHandi').innerHTML += `<td></td>`
        document.getElementById('parForHole').innerHTML += `<td></td>`
      }
      // get the yardages for each of the holes and then display them
      let yardage = response.data.holes[i].teeBoxes[teeNumber].yards;
      document.getElementById('yardages').innerHTML += `<td>${yardage}</td>`

      // get the handicap for each of the holes and then display them
      let handicap = response.data.holes[i].teeBoxes[teeNumber].hcp; 
      document.getElementById('appendHandi').innerHTML += `<td>${handicap}</td>`

      //get the par for each of the holes and then display it 
      let par = response.data.holes[i].teeBoxes[teeNumber].par;
      document.getElementById('parForHole').innerHTML += `<td>${par}</td>`
    }
  })

  // display the players names and inputs 
  let outCounter1 = 1;
  for (let number = 0; number < players.length; number++) {
    
    let playerHTML = ` 
      <tr id="player${number}">
      <th scope="row" id="playerName">${players[number]}</th>`

    for (let i = 0; i < numOfHoles; i++) {
      if(i === 9 ){
        if(i === 18) outCounter1 += 1; 
        playerHTML += `<td id="player${number}out${outCounter1}">0</td>`
        playerHTML += `<td data-scoreInput id="player${number}ScoreVal${i}" class="scoreInput"><input class="player${number + 1}Value" type="number"></td>`
      } else{
        playerHTML += `<td data-scoreInput id="player${number}ScoreVal${i}" class="scoreInput"><input class="player${number + 1}Value" type="number"></td>`
      }
    }
    
    playerHTML += `
      <td id="player${number}out${outCounter}" class="centerTd" >0</td>
      <td id="player${number}Total" class="centerTd">0</td>
      </tr> 
    `;
    document.getElementById('headers').innerHTML += `${playerHTML}`;
  }

  //aad the event listeners to the input areas 
  let playerInput = document.querySelectorAll('[data-scoreInput]')
  playerInput.forEach(playerIn => {
    playerIn.addEventListener("click", function(){ 
      // input value
      let inputValue = this.firstChild.value;
      let playerClickedOn = this.firstChild.className;

        // find out which player this belongs to 
      if(playerClickedOn === 'player1Value'){
        renderTheScore(0)
      } else if(playerClickedOn === 'player2Value'){
        renderTheScore(1)
      } else if(playerClickedOn === 'player3Value'){
        renderTheScore(2)
      } else {
        renderTheScore(3)
      }    
      });
    })
  }
function renderTheScore(player) {
  let totalValue = 0; 
  let first9Total = 0;
  let second9Total = 0; 
  // 9 holes
  for (let i = 0; i < 9; i++) {
    // gather all of the input values 
    let inputVal= document.getElementById(`player${player}ScoreVal${i}`).firstChild.value;
    // calculate them 
    inputVal = Number(inputVal)
    first9Total += inputVal;
    totalValue += inputVal; 
    // display 
    document.getElementById(`player${player}out1`).innerText = first9Total; 
    }
  // 18 holes 
  if(numOfHoles === 18){
    for (let i = 9; i < 18; i++) {
      let inputVal= document.getElementById(`player${player}ScoreVal${i}`).firstChild.value;
      inputVal = Number(inputVal);
      second9Total += inputVal;
      totalValue += inputVal; 
      document.getElementById(`player${player}out2`).innerText = second9Total; 
    }
  } 
  document.getElementById(`player${player}Total`).innerText = totalValue; 

}

function endGame() {
  let scores = [];
  for (let i = 0; i < numOfPlayers; i++) {
   scores.push(document.getElementById(`player${i}Total`).innerText); 
  }
  $('.scoreCard').empty();
  $('#endRoundBtn').empty();
  $('#endRoundBtn').remove();
  scores.forEach((score, index)=> {
    console.log(score, index)
    document.getElementById('courseTitle').innerHTML += `<div class="bigger">${players[index]} shot ${score} `
    // document.getElementsByClassName('scoreCard').innerText += `player ${index} shot ${score}`
  });
  

}





