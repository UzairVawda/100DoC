const fs = require('fs')
const path = require('path')
const express = require('express');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))

app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/restaurants', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'views', 'restaurants.html'));
});

app.get('/recommend', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'views', 'recommend.html'));
});

app.get('/confrim', function(req, res, next) {
	console.log(__dirname)
	res.sendFile(path.join(__dirname, 'views', 'confrim.html'));
});

app.get('/about', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.post('/recommendRes', function(req, res, next) {
	const filePath = path.join(__dirname, 'data', 'recs.json')
	const fileData = fs.readFileSync(filePath)
	const fileDataJSON = JSON.parse(fileData)
	const recommend = {
		name: req.body.name,
		address: req.body.address,
		cuisine: req.body.cuisine,
		website: req.body.website,
		description: req.body.description
	}
	fileDataJSON.push(recommend)
	console.log(recommend)
	fs.writeFileSync(filePath, JSON.stringify(fileDataJSON));
	// res.send('Data Stored!')
	res.redirect('/restaurants');
})

app.listen(6969)