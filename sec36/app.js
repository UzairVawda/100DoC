const express = require('express');

const quoteRoutes = require('./Routes/quotes.routes')

const app = express()

app.use('/quote', quoteRoutes)

app.listen(7000);