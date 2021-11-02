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

76




const displayName = document.querySelector('h1');
const bird = document.querySelector('.character');
const gameDisplay = document.querySelector('.game');
const obstacles = document.querySelector('#obstacles')

let birdLeft = 50;
let birdBottom = 500;
const gravity = 2;
let form = document.querySelector("#playerName");

function playGame(){
    
    document.body.style.backgroundImage = "url('game_back.jpg')";
    bird.style.bottom = birdBottom + 'px';
    bird.style.left = birdLeft + 'px';
    generateObstacle();
    
    let gravityId = setInterval(gravityN,20)
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        birdBottom += 35;
    }
}

function gravityN(){
    
   birdBottom -= gravity
   bird.style.bottom = birdBottom + 'px';
   bird.style.left = birdLeft + 'px';
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
    let obstacleLeft = 450;
    let randomHeight = Math.random() * 50;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement('div');

    obstacle.classList.add('obstacle');
    obstacles.appendChild(obstacle);
    obstacle.style.bottom = obstacleBottom + 'px'
    obstacle.style.left = obstacleLeft + 'px'

    function moveObstacle(){
        obstacleLeft -= 2;
        obstacle.style.left = obstacleLeft + 'px';
        // console.log(obstacleLeft)
        if (obstacleLeft === -50){
            clearInterval(timerId);
            obstacles.removeChild(obstacle);
        }
    }
    let timerId = setInterval(moveObstacle, 20);
    setTimeout(generateObstacle, 3000);
    
}

