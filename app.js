/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var gameOn = true;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gameOn) {
    var dice = Math.floor(Math.random() * 6 + 1);
    document.querySelector(".dice").style.display = "block";
    document.querySelector(".dice").src = "dice-" + dice + ".png";
    if (dice !== 1) {
      currentScore[activePlayer] += dice;
      document.querySelector("#current-" + activePlayer).textContent = currentScore[activePlayer];
    } else {
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
      gameOver();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gameOn) {
    globalScores[activePlayer] += currentScore[activePlayer];
    currentScore[activePlayer] = 0;
    document.querySelector("#score-" + activePlayer).textContent = globalScores[activePlayer];

    if (globalScores[activePlayer] >= 20) {
      gameOver();
    } else {
      document.querySelector(".dice").style.display = "none";
      document.querySelector("#current-" + activePlayer).textContent = 0;
      document.querySelector(".player-0-panel").classList.toggle("active");
      document.querySelector(".player-1-panel").classList.toggle("active");
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    }
  }
})

document.querySelector(".btn-new").addEventListener("click", function() {
  gameOn = true;
  init();
})

function gameOver() {
  gameOn = false;
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector("#name-" + activePlayer).textContent = 'WINNER';
  document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
  document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
}

function init() {
  globalScores = [0, 0];
  currentScore = [0, 0];
  activePlayer = 0;
  document.querySelector(".dice").style.display = "none";
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
