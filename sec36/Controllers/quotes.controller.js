const Quote = require('../Models/quotes.model')

async function getQuotes(req, res) {
	const quote = await Quote.getRandomQuote()
	console.log(quote)
	res.json({
		quote : quote
	})
}

module.exports = {
	getQuotes : getQuotes
}