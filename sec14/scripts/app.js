//input
const formElement = document.querySelector('form');

const currentGameValues = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
]

const players = [
	{
		'name': '',
		'symbol': 'X'
	},
	{
		'name': '',
		'symbol': 'O'
	}
]

//holders
const activePlayerName = document.getElementById('activePlayerName')
const gameBoard = document.getElementById('activeGame')
const errorMsg = document.getElementById('errorMsg');
const backdrop = document.getElementById('backdrop');
const playerOneNameHolder = document.getElementById('playerOneName');
const playerTwoNameHolder = document.getElementById('playerTwoName');
const gameFieldElements = document.querySelectorAll('#grid li')
const winnerArc = document.getElementById('winnerArc');
const winnerLine = document.getElementById('winnerLine');

//btn
const playerOneBtn = document.getElementById('playerOneEdit');
const playerTwoBtn = document.getElementById('playerTwoEdit');
const confirmBtn = document.getElementById('confirmBtn');
const closeBtn = document.getElementById('closeBtn');
const newGame = document.getElementById('newGame');

let currentPlayerEdit = 0;
let currentPlayerMove = 0;
let currentRound = 1;

playerOneBtn.addEventListener('click', launchModal);
playerTwoBtn.addEventListener('click', launchModal);
newGame.addEventListener('click', startNewGame)
formElement.addEventListener('submit', updatePlayername)
closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);

for (const field of gameFieldElements) {
	field.addEventListener('click', gameFieldClicked)
}