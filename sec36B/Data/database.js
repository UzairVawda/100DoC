const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function initDB() {
  const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
  database = client.db('todoAPI');
}

function getDB() {
  if (!database) {
    throw new Error('Database not connected!');
  }

  return database;
}

module.exports = {
  initDB: initDB,
  getDB: getDB
};