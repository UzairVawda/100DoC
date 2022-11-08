const db = require("../Data/Database");

class Quote {
  static async getRandomQuote() {
    const allQuotes = await db.getDb().collection('quotes').find().toArray();
    console.log(allQuotes)
    const randomQuoteIndex = Math.floor(Math.random() * allQuotes.length);
    const randomQuote = allQuotes[randomQuoteIndex]
    console.log(randomQuote)
		return randomQuote.text
  }
}

module.exports = Quote;
