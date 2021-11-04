const gameStorage = window.localStorage;
const bird = document.querySelector('.bird');
const gameDisplay = document.querySelector('.game-container');
const menuDisplay = document.querySelector('.menu-container')
const obstacles = document.querySelector('.obstacles')
const footer = document.querySelector('.footer');
const displayName = document.querySelector('#displayName')
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 10;
const loseSplash = document.querySelector('.lose-splash')

let form = document.querySelector("#playerName");
let birdLeft = 170;
let birdBottom = 350;
let gravity = 2;
let isGameOver = false;
let gap = 430;
let playerName = 'none';
let score = 0;

    
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.input.value;
    playerName = name;
    displayName.innerText = name;
    changeAssets();
    playGame();    
})

function changeAssets(){
    form.style.display = 'none';
    bird.style.backgroundImage = "url('character.png')";
    bird.style.display = 'block';
    footer.style.backgroundImage = "url('footer.png')";
    footer.style.backgroundColor = "transparent";
    footer.style.display = 'flex';
}

function playGame(){
    gameDisplay.style.display = 'flex';

    function changeGravity(){
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }

    let gameTimerId = setInterval(changeGravity, 20);

    function control(e){
        if (e.keyCode === 32){
            jump();
        }
    }

    function jump(){
        if (birdBottom < 610) birdBottom += 30;
        bird.style.bottom = birdBottom + 'px';
    }

    document.addEventListener('keyup', control);

    function generateObstacle(){
        let obstacleLeft = 400;
        let obstacleBottom = Math.random() * 60;
        
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');

        if (!isGameOver){
            obstacle.style.backgroundImage = "url('sinopharm.png')";
            topObstacle.style.backgroundImage = "url('sinopharm.png')";
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
            obstacles.appendChild(obstacle);
            obstacles.appendChild(topObstacle);
            obstacle.style.left = obstacleLeft + 'px';
            obstacle.style.bottom = obstacleBottom + 'px';
            topObstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.bottom = obstacleBottom + gap + 'px';
        }

        if (score >= 3 && score < 6) {
            obstacle.style.backgroundImage = "url('sputnik.png')";
            topObstacle.style.backgroundImage = "url('sputnik.png')";
            gameDisplay.style.backgroundImage = "url('game_back2.jpg')"
        }else if (score >= 6 && score < 10){
            obstacle.style.backgroundImage = "url('astrazeneca.png')";
            topObstacle.style.backgroundImage = "url('astrazeneca.png')";
            gameDisplay.style.backgroundImage = "url('game_back3.jpg')"
        }else if (score >= 10 && score < 15){
            obstacle.style.backgroundImage = "url('pfizer.png')";
            topObstacle.style.backgroundImage = "url('pfizer.png')";
            gameDisplay.style.backgroundImage = "url('game_back4.jpg')"
        }else if (score >= 15){
            obstacle.style.backgroundImage = "url('moderna.png')";
            topObstacle.style.backgroundImage = "url('moderna.png')";
            gameDisplay.style.backgroundImage = "url('game_back5.jpg')"
        };

        function moveObstacle(){
            let increaseScore = document.querySelector(".score span")

            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';
   
            if (obstacleLeft === -50){
                clearInterval(obstacleTimerId);
                obstacles.removeChild(obstacle);
                obstacles.removeChild(topObstacle);
            }

            if (obstacleLeft === 150){
                score += 1;
                increaseScore.innerText = score;  
            }

            if (obstacleLeft > 160 && obstacleLeft < 200 && (birdBottom < obstacleBottom + 295 || birdBottom > obstacleBottom + gap - 60) ||
                birdBottom === 0){
                getHighScores();
                clearInterval(obstacleTimerId); 
                gameOver();
            }
        }
        let obstacleTimerId = setInterval(moveObstacle, 20);

        if (!isGameOver) setTimeout(generateObstacle, 3000);
    }
    
    generateObstacle();
    
    function gameOver(){
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
        loseSplash.style.display = 'block';
        bird.style.display = 'none';
        obstacles.style.display = 'none';
        displayHighScores();     
    }

    function getHighScores(){
        const newScore = {
            score: score,
            name: playerName
        };
        let table = document.querySelector('tbody');
    
        highScores.push(newScore);
        highScores.sort( (a, b) => b.score - a.score);
        highScores.splice(MAX_HIGH_SCORES);

        for (element of highScores){
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            td1.innerText = element['name'];
            td2.innerText = element['score'];
            tr.append(td1, td2);
            table.appendChild(tr);
        }
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }

    function displayHighScores(){
        let scoreTable = document.querySelector(".highScores");
        scoreTable.style.display = "flex";
    }
}