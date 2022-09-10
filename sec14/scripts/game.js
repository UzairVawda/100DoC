function resetGame() {
	currentGameValues[0] =[0,0,0]
	currentGameValues[1] =[0,0,0]
	currentGameValues[2] =[0,0,0]
	for (const field of gameFieldElements) {
		field.textContent = "";
		field.classList.remove("disabled")
	}
	currentPlayerEdit = 0;
	currentPlayerMove = 0;
	currentRound = 1;
	winnerArc.style.display = "none";
}

function startNewGame(event) {
	if (players[0].name === "" || players[1].name === "") {
		alert("Please Enter Names!");
    return;
  }
	resetGame();
	activePlayerName.textContent = players[currentPlayerMove].name;
  gameBoard.style.display = "block";
}

function switchPlayer() {
  if (currentPlayerMove === 0) {
    currentPlayerMove = 1;
    activePlayerName.textContent = players[currentPlayerMove].name;
  } else {
    currentPlayerMove = 0;
    activePlayerName.textContent = players[currentPlayerMove].name;
  }
}

function gameFieldClicked(event) {
  //get field clicked
  if (
    currentGameValues[event.target.dataset.row - 1][
      event.target.dataset.col - 1
    ] > 0
  ) {
    alert("select plty field");
    return;
  }
  currentGameValues[event.target.dataset.row - 1][
    event.target.dataset.col - 1
  ] = currentPlayerMove + 1;
  event.target.textContent = players[currentPlayerMove].symbol;
  event.target.classList.add("disabled");
  const trigger = checkBoard();
  if (trigger === -1) {
    winnerLine.textContent = "DRAW, Start a new game!";
    winnerArc.style.display = "block";
    return;
  } else if (trigger === 1) {
    winnerLine.textContent =
      playerOneNameHolder.textContent + " is the WINNER!";
    winnerArc.style.display = "block";
    return;
  } else if (trigger === 2) {
    winnerLine.textContent =
      playerTwoNameHolder.textContent + " is the WINNER!";
    winnerArc.style.display = "block";
    return;
  }
  currentRound++;
  switchPlayer();
}


function checkBoard() {
  for (let z = 0; z < 3; z++) {
    if (
      currentGameValues[z][0] > 0 &&
      currentGameValues[z][0] === currentGameValues[z][1] &&
      currentGameValues[z][1] === currentGameValues[z][2]
    ) {
      return currentGameValues[z][0];
    }
  }
  for (let z = 0; z < 3; z++) {
    if (
      currentGameValues[0][z] > 0 &&
      currentGameValues[0][z] === currentGameValues[1][z] &&
      currentGameValues[1][z] === currentGameValues[2][z]
    ) {
      return currentGameValues[0][z];
    }
  }
  if (
    currentGameValues[0][0] > 0 &&
    currentGameValues[0][0] === currentGameValues[1][1] &&
    currentGameValues[1][1] === currentGameValues[2][2]
  ) {
    return currentGameValues[1][1];
  }
  if (
    currentGameValues[0][2] > 0 &&
    currentGameValues[0][2] === currentGameValues[1][1] &&
    currentGameValues[1][1] === currentGameValues[2][0]
  ) {
    return currentGameValues[1][1];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}
