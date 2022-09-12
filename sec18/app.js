const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express();
app.use(express.urlencoded({extended: false}))

app.get('/', function(req, res) {
	res.send(`
	<form action="/storeUser" method="POST">
		<label for="username">Full Name</label>
		<input type="text" name="username" id="username">
		<button>Submit</button>
	</form>
	`);
});

app.post('/storeUser', function(req, res) {
	const username = req.body.username;
	const filePath = path.join(__dirname, 'data', 'users.json')
	const fileData = fs.readFileSync(filePath);
	const dataToJSON = JSON.parse(fileData)
	const dataNode = {
		'name': username,
		'time': new Date().toISOString()
	}
	dataToJSON.push(dataNode)
	
	fs.writeFileSync(filePath, JSON.stringify(dataToJSON));
	// res.send('Data Stored!')
	res.redirect('/getUsers');
});

app.get('/getUsers', function(req, res) {
	const filePath = path.join(__dirname, 'data', 'users.json')
	const fileData = fs.readFileSync(filePath);
	const dataToJSON = JSON.parse(fileData)
	let table = `
	<table>
		<tr>
			<th>Name</th>
			<th>Time</th>
		</tr>
		<tr>
	`
	for (const dataNode in dataToJSON) {
		for (const key in dataToJSON[dataNode]) {
			table+=(`<td>${dataToJSON[dataNode][key]}</td>`)
		}
		table+=('</tr>')
	}
	table+=('</table>')
	res.send(table)

});

app.get('/currenttime', function(req, res) {
	res.statusCode = 200;
	res.send("<h1>" + new Date().toISOString() + "</h1>");
});

app.listen(6969);
