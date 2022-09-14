const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, '..' , "data", "recs.json");

function readDB() {
  const fileData = fs.readFileSync(filePath);
  const fileDataJSON = JSON.parse(fileData);
	return fileDataJSON
}

function writeDB(resToDB) {
	fs.writeFileSync(filePath, JSON.stringify(resToDB));
}

module.exports = {
	readDB: readDB,
	writeDB: writeDB
}