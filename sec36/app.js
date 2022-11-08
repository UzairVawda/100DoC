const express = require('express');

const quoteRoutes = require('./Routes/quotes.routes')
const db = require('./Data/Database')

const app = express()

app.use('/quote', quoteRoutes)

app.use(function(error, req, res, next) {
	req.status(500).json({
		message: "FAILED TO DO SOMETHING"
	})
})

db.initDB().then(function() {
	app.listen(7000);
}).catch(function(error) {
	console.log("check db")
})
