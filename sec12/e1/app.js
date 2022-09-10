const remainingCount = document.getElementById('remainingChars')
const inputElement = document.getElementById('productName')

function updateCounter(event) {
	let length = event.target.value.length
	let remaining = inputElement.maxLength - length
	remainingCount.textContent = remaining
}

inputElement.addEventListener('input', updateCounter)

