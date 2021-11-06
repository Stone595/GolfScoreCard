
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

// grab the object and then loop through the availible tee boxes on that course



function getHoles(numberOfHoles) {
  numOfHoles = numberOfHoles
  document.getElementById('holesSelector').innerText = `Holes: ${numOfHoles}`
}

function getTees(tees1) {
  if(tees1 == 'pro') {tees = 'pro'; teeNumber = 0;};
  if(tees1 == 'champion') {tees = 'champion'; teeNumber = 1;};
  if(tees1 == 'men') {tees = 'men'; teeNumber = 2;};
  if(tees1 == 'women') {tees = 'women'; teeNumber = 3;};
  document.getElementById('teeSelector').innerText = `Tees: ${tees}`
}

function getCourseData(id) {
  if(id){
    return fetch('http://golf-courses-api.herokuapp.com/courses/' + id)
    .then(response => response.json())
  } else{
    return fetch('http://golf-courses-api.herokuapp.com/courses/' )
      .then(response => response.json())
  }
}

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
    courseId = 18300;
    document.getElementById('avCor').innerText = `Course: Fox Hollow`;
  } else if(name == 'thanks'){
    //thanksgiving
    courseId = 11819;
    document.getElementById('avCor').innerText = `Course: Thanksgiving Point`;
  } else{
    //spanish
    courseId = 19002
    document.getElementById('avCor').innerText = `Course: Spanish Oaks`;
  }
}

function startRound() {
  //get the names of the players
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
  if(!courseId) {alert('Must Choose a course'); return}
  if(!tees) {alert('Must Choose a tee box'); return}
  
  
  // // delete the html thats on the page
  $('.EnterContainer').empty(); 
  $('.EnterContainer').remove();
  
  //inject base scorecard
  document.body.innerHTML += `
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
  </div>`;

  //put in the amount of holes
  let holesSelector = document.getElementById('appendHoles');
  let holesHTML =``;
  for (let i = 1; i < numOfHoles + 1; i++) {
    holesHTML += `<th scope="col">${i}</th>`
    if(i == 9 || i == 18){
      holesHTML += `<th scope="col">Out</th>`
    }
  }
  holesHTML += `<th scope="col">Total: </th>`
  holesSelector.innerHTML +=  holesHTML;
  // display the yardage for the tee boxes
  document.getElementById('appendHeaderData').innerHTML += `<tr id="yardages"> <th scope="row">${tees} Yardage</th><tr>`
  



  let handicapHTMl = ``;
  let parHTML = ``;
  console.log(courseId)
  console.log(numOfHoles)
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
  //display the handicap and the tees

  // create all of the hadicaps for each of the holes

  // create all of the par elements for each of the holes
  document.getElementById('headers').innerHTML +=  `
    
    <span id="playersAnchor"></span>
    `



  // display the players names 
  console.log(players, players.length)
  for (let number = 0; number < players.length; number++) {

    let playerHTML = ` 
    <tr id="player${number}">
      <th scope="row" id="playerName">${players[number]}</th>

    `
    for (let i = 0; i < numOfHoles; i++) {
      if(i == 9 ){
        playerHTML += `<td></td>`
        playerHTML += `<td data-scoreInput class="scoreInput"><input type="number"></td>`
      } else{
        playerHTML += `<td data-scoreInput class="scoreInput"><input type="number"></td>`
      }
    }
    
    playerHTML += `
      <td id="player${number}" class="centerTd" >0</td>
      <td id="player${number}Total" class="centerTd">0</td>
      </tr> 
    `;
    document.getElementById('headers').innerHTML += `${playerHTML}`;
  }
  ///
  //aad the event listeners to the input areas 
  for(let i = 0; i < numOfPlayers; i++){
    let playerInput = $(`.player${i}`);
    

  }



  //get the api data

  getCourseData(courseId)
    // example of data
    .then(json => {
     console.log(json.data); 
     return json.data;
    })
  // do the tee distances
    .then(data => {
     console.log(data.holes);
     for(let i = 0; i < numOfHoles; i++){
       let teeBox = data.holes[i].teeBoxes;
      
     }

    })

  // .then(json => {console.log(json); return json})

  //do the handicap
  // .then(data => {console.log(data); return data})

  // do the par for the holes
  // .then(data => {console.log(data)})
  //inject the second set of html 
}

//use a case statement for the event listener for the input and then depending on which one it is you add it to the total value
