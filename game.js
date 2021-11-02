initGame();

function initGame() {
    //playGame();
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




const displayName = document.querySelector('h1');
const bird = document.querySelector('.character');
const gameDisplay = document.querySelector('.game');

let birdLeft = 550;
let birdBottom = 600;
let form = document.querySelector("#playerName");

function playGame(){
    document.body.style.backgroundImage = "url('game_back.jpg')";
    bird.style.bottom = birdBottom + 'px';
    bird.style.left = birdLeft + 'px';
    generateObstacle();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.input.value;
    playGame();
    displayName.innerText = name;
    form.style.display = 'none';
    bird.style.display = 'block';
    
})

function generateObstacle(){
    let obstacleLeft = 910;
    let randomHeight = Math.random() * 90;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement('div');

    obstacle.classList.add('obstacle');
    gameDisplay.appendChild(obstacle);
    obstacle.style.bottom = obstacleBottom + 'px'
    obstacle.style.left = obstacleLeft + 'px'

    function moveObstacle(){
        obstacleLeft -= 2;
        obstacle.style.left = obstacleLeft + 'px';
        console.log(obstacleLeft)
        if (obstacleLeft === 450){
            clearInterval(timerId);
            gameDisplay.removeChild(obstacle);
        }
    }
    let timerId = setInterval(moveObstacle, 20);
    setTimeout(generateObstacle, 3000);
}