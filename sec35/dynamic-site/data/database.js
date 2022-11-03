const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let mongoURI = "mongodb://localhost:27017";

if (process.env.MONGO_URL) {
  mongoURI = process.env.MONGO_URL
}

let database;

async function initDatabase() {
  const client = await MongoClient.connect(mongoURI);
  database = client.db('deployment');
}

function getDb() {
  if (!database) {
    throw new Error('No database connected!');
  }

  return database;
}

module.exports = {
  initDatabase: initDatabase,
  getDb: getDb,
};
