function launchModal(event) {
	gameConfig.style.display = 'block'
	backdrop.style.display = 'block'
	currentPlayerEdit = event.target.dataset.playerid
};

// function confirmModal(event) {
	// if (currentPlayerEdit === 'playerOneEdit') {
	// 	playerOneNameHolder.textContent = playerName.value
	// } else if (currentPlayerEdit === 'playerTwoEdit') {
	// 	playerTwoNameHolder.textContent = playerName.value
	// }
	// closeModal();
// };

function updatePlayername(event) {
	event.preventDefault();
	const formData = new FormData(event.target);
	const enteredName = formData.get('playerName').trim();
	if (!enteredName){
		errorMsg.style.display = 'block'
		return;
	}
	if (currentPlayerEdit === '1') {
		playerOneNameHolder.textContent = playerName.value
		players[0]['name'] = playerName.value
	} else if ( currentPlayerEdit === '2') {
		playerTwoNameHolder.textContent = playerName.value
		players[1]['name'] = playerName.value
	}
	closeModal();
}

function closeModal(event) {
	gameConfig.style.display = 'none'
	backdrop.style.display = 'none'
	formElement.reset()
};