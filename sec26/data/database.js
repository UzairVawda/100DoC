const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
	const client = await MongoClient.connect('mongodb://localhost:27017')
	database = client.db('blog');
}

function getDB() {
	if (!database) {
		throw { message: 'Failed to establish a connection!'}
	}
	return database
}

module.exports = {
	connect: connect,
	getDB: getDB,
}