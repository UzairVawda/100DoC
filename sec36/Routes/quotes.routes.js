const express = require('express');

const router = express.Router();

const quoteController = require('../Controllers/quotes.controller');

router.get('/', quoteController.getQuotes);

module.exports = router;

