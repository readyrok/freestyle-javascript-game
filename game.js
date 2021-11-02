initGame();

function initGame() {
    // playGame();
    // Your game can start here, but define separate functions, don't write everything in here :)

}

const play = document.querySelector('button')
const test = play.getBoundingClientRect()
console.log(test)
// function addBackground(){
//     document.body.style.backgroundImage = "url('background.jpg')"
// }

// play.addEventListener('click', () => addBackground())
play.addEventListener('keyup', (event) => {
    console.log(event.clientX)
   
  })


function playGame(){
    let playerName = document.querySelector('#playerName').value;
    
    console.log(button)
    document.body.style.backgroundImage = '';

}

let form = document.querySelector("#playerName");
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = event.target.input.value;
    let displayName = document.querySelector('h1');
    displayName.innerText = name
    form.style.display = 'none'
})

