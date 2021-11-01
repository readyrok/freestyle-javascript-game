initGame();

function initGame() {

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
