
let numOfHoles;
let course; 
let numOfPlayers;
let players = [];
let courseId; 


function amountOfPlayers(x) {
  //empty the area
  players = []
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

function getHoles(numberOfHoles) {
  numOfHoles = numberOfHoles
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


function showAvalibleCoursesOnDrop() {
  fetch(`http://golf-courses-api.herokuapp.com/courses`)
    .then(response => response.json())
    .then(json =>{
      let n1 = json.courses[0].name; 
      let n2 = json.courses[1].name; 
      let n3 = json.courses[2].name;
      $('#avCourses').append(`
      <button onclick="getCourseId('fox')">${n1}</button>
      <button onclick="getCourseId('thanks')">${n2}</button>
      <button onclick="getCourseId('spanish')">${n3}</button>
      `)
    })
}

showAvalibleCoursesOnDrop()

function getCourseId(name) {
  if(name == 'fox'){
    //fox Hallow
    courseId = 18300;
  } else if(name == 'thanks'){
    //thanksgiving
    courseId = 11819;
  } else{
    //spanish
    courseId = 19002
  }
}

function startRound() {
  //get the names of the players
  // for (let i = 1; i < numOfPlayers +1; i++) {
  //   let tempName = document.getElementById(`player${i}`).value;
  //   players.push(tempName)
    
  // }
  // console.log(players)
  // // delete the html thats on the page
  // $('.EnterContainer').empty(); 
  // $('.EnterContainer').remove();
  
  //inject base scorecard
  numOfHoles = 9
  let holesSelector = document.getElementById('appendHoles');
  let holesHTML =``;
  let counter = 1; 
  for (let i = 1; i < numOfHoles + 1; i++) {
    holesHTML += `<th scope="col">${i}</th>`
    if(i == 9 || i == 19){
      holesHTML += `<th scope="col">Out</th>`


    }
    // if(i == 10 || i == 18){
    //   holesHTML += `<th scope="col">Out</th>`
    //   holesHTML += `<th scope="col">${i}</th>`

    // } else {
    //   holesHTML += `<th scope="col">${i}</th>`

    // }
  }
  holesHTML += `<th scope="col">Total: </th>`
  holesSelector.innerHTML +=  holesHTML;
  
  //get the api data
  let coursePicked = getCourseId('thanks')
  console.log(courseId)

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
      let hole = data.holes[i];
      for(const tee in hole.teeBoxes){
        console.log(data.holes[i].teeBoxes[tee].yards, 'tee yardage')
        console.log(document.getElementById(`hole${i}Yds`))

      }
    }

  })

  // .then(json => {console.log(json); return json})

  //do the handicap
  // .then(data => {console.log(data); return data})

  // do the par for the holes
  // .then(data => {console.log(data)})
  //inject the second set of html 
}

startRound()