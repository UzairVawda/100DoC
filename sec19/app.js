const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs' );

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res, next) {
	res.render('index');
});

app.get('/restaurants', function(req, res, next) {
	const filePath = path.join(__dirname, 'data', 'recs.json')
	const fileData = fs.readFileSync(filePath)
	const fileDataJSON = JSON.parse(fileData)

	res.render('restaurants', {
		data: fileDataJSON,
		numberofRes: fileDataJSON.length
	});
});

app.get('/recommend', function (req, res) {
  res.render('recommend');
});

app.post('/recommendRes', function(req, res, next) {
	const restaurant = req.body;
	const filePath = path.join(__dirname, 'data', 'recs.json')
	const fileData = fs.readFileSync(filePath)
	const fileDataJSON = JSON.parse(fileData)

	fileDataJSON.push(restaurant)
	fs.writeFileSync(filePath, JSON.stringify(fileDataJSON));
	res.redirect('/confirm');
})

app.get('/confirm', function (req, res) {
  res.render('confirm');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.listen(6969)