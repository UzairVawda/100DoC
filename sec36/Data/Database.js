const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function initDB() {
	const client = await MongoClient.connect('mongodb://localhost:27017');
	database = client.db('quotes');
}

function getDb() {
	if (!database) {
		throw new Error('Database Not Connected!')
	}
	return database
}

module.exports = {
	initDB : initDB,
	getDb : getDb
}