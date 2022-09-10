let userNumber = document.getElementById('userNumber');
let calculateSumBTN = document.getElementById('calculateSumBTN');
let calculatedSumDisplay = document.getElementById('calculatedSumDisplay');

function calculateSum(event) {
	let num = parseInt(userNumber.value)
	let sum = 0
	for (let z=num; z>0; z--) {
		sum += z
	}
	console.log(sum)
	calculatedSumDisplay.textContent = sum
	calculatedSumDisplay.style.display = 'block'

}

calculateSumBTN.addEventListener('click', calculateSum);

let documentLinks = document.querySelectorAll('#highlight-links a')
let highlightBtn = document.querySelector('#highlight-links button')

function highlightLinks(event) {
	for (const link of documentLinks) {
		if (link.classList.contains('highlight')){
			link.classList.remove('highlight')
		} else {
			link.classList.add('highlight')
		}
	}
}

highlightBtn.addEventListener('click', highlightLinks)

const personalData = {
	'Full Name': 'Uzair Vawda',
	'Age': 22,
	'Location': 'NYC'
}

let generateDataBtn = document.querySelector('#user-data button')
let displayList = document.getElementById('output-user-data')

function displayInfo(event) {
	for (const key in personalData) {
		let listItem = document.createElement('li')
		listItem.textContent = key + ': ' + personalData[key]
		displayList.append(listItem)
	}
}

generateDataBtn.addEventListener('click', displayInfo)

let targetNum = document.getElementById('user-target-number')
let rollBtn = document.querySelector('#statistics button')

function rollDice() {
	return Math.floor(Math.random() * 6 ) + 1
}

function calcNumOfRolls(event) {
	const outputList = document.getElementById('dice-rolls')
	const outputTarget = document.getElementById('output-total-rolls')
	const outputAttempts = document.getElementById('output-target-number')
	
	const target = targetNum.value;
	outputList.innerHTML = '';

	let numOfRolls = 0;
	let targetWasRolled = false;
	
	while (!targetWasRolled) {
		const rolledNumber = rollDice()
		// if (rolledNumber === parseInt(target)){
		// 	targetWasRolled = true;
		// }
		numOfRolls++;
		const newItem = document.createElement('li')
		const finalOutput = 'Rolls ' + numOfRolls + ': ' + rolledNumber
		outputList.append(newItem) 
		newItem.textContent = finalOutput
		targetWasRolled = rolledNumber === parseInt(target)
	}
	outputTarget.textContent = target;
	outputAttempts.textContent = numOfRolls;
}

rollBtn.addEventListener('click', calcNumOfRolls)