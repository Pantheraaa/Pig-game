'use script';

// selecting elements:
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const curScrPlayer1 = document.querySelector('.current-score--1');
const curScrPlayer2 = document.querySelector('.current-score--2');
const diceImg = document.querySelector('.img');
const score01 = document.querySelector('.score--1');
const score02 = document.querySelector('.score--2');
const player1Bgr = document.querySelector('.player--active');
const player2Bgr = document.querySelector('.player--inactive');

// Starting Conditions:
let activePlayer, currentScore, totalScore, scores, playing;

const init = function(){
    activePlayer = 1;
    currentScore = 0;
    totalScore = 0;
    scores = [0, 0];
    playing = true;
    curScrPlayer1.textContent = 0;
    curScrPlayer2.textContent = 0;

    diceImg.style.display = 'none';
    score01.textContent = 0;
    score02.textContent = 0;
    document.querySelector('.active').classList.remove('winner');
    document.querySelector('.player--1').textContent = 'PLAYER 1';
    document.querySelector('.player--2').textContent = 'PLAYER 2';
    player1Bgr.classList.add('active');
    player2Bgr.classList.remove('active');
}

const switchPlayer = function (playerIdentifier, operation) {
    document.querySelector(playerIdentifier + `${activePlayer}`).textContent = operation;
    currentScore = 0;
    activePlayer = activePlayer === 1 ? 2 : 1;
    player1Bgr.classList.toggle('active');
    player2Bgr.classList.toggle('active');
}

function winner() {
    document.querySelector('.active').classList.add('winner');
    document.querySelector(`.player--${activePlayer}`).textContent = 'WINNER!';
}

init();

// Rolling dice functionality:
function btnRollPressed() {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        
        // 2. Display dice
        diceImg.style.display = 'block';
        diceImg.style.backgroundImage = `url('./dice-${dice}.png')`;

        
        // 3. Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            currentScore += dice;
            document.querySelector(`.current-score--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer('.current-score--', currentScore);
        }
    }
};

// Hold button functionality:
function btnHoldPressed() {
    if (playing) {
        // 1. Add Current score to Total score:
        scores[activePlayer - 1] += currentScore;
        document.querySelector(`.score--${activePlayer}`).textContent = scores[activePlayer - 1];
        
        // 2. Check Total score, if score < 100: 
        if (scores[activePlayer - 1] >= 100) {
            diceImg.style.display = 'none';
            playing = false;
            scores[activePlayer - 1] += currentScore;
            winner();
        } else {
            // 3. Switch player:
            switchPlayer('.score--', scores[activePlayer - 1])
        }
    }
};
// Events:
btnRoll.addEventListener('click', btnRollPressed);
btnHold.addEventListener('click', btnHoldPressed);
btnNew.addEventListener('click', init);