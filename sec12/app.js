let pElement = document.querySelector("p");
let inputElement = document.querySelector("input");
console.log(pElement);
console.log(pElement);

let counter = 1;

function changeText() {
  pElement.textContent = inputElement.value.length
	counter++;
};

function userInput(event) {
	console.log(event.target.value)
	console.log(inputElement.value.length)
	//event.data give the current data added
	//event.target.value gives current data
};

pElement.addEventListener("click", changeText);
inputElement.addEventListener("input", userInput);
