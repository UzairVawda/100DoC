function postIsValid(title, content) {

	return title &&
	content &&
	title.trim() !== "" &&
	content.trim() !== ""

}

function userIsValid(email, cEmail, password) {

	return email &&
	cEmail &&
	password &&
	password.trim().length < 6 &&
	email === cEmail ||
	email.includes('@')

}

module.exports = {
	postIsValid: postIsValid,
	userIsValid: userIsValid
}