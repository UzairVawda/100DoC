// // // // // ASYNC / AWAIT

// const fs = require('fs');
const fs = require('fs/promises');

function readFile() {
// fs.readFile('data.txt', function(error, details) {
// 	console.log('Done Parsing -> ')
// 	console.log(details.toString())
// })
	fs.readFile('data.txt').then(function(details) {
		console.log('Done Parsing -> ')
		console.log(details.toString())
	}).catch((error) => {
		console.error(error);
	});
	
	console.log('Hello')
};

readFile();