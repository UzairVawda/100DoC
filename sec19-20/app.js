const path = require("path");
const uuid = require("uuid");
const express = require("express");

const dbFuncs = require("./util/dbFuncs");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.status(200).render("index");
});

app.get("/restaurants", function (req, res) {
  const data = dbFuncs.readDB();

  res.status(200).render("restaurants", {
    data: data,
    numberofRes: data.length,
  });
});

app.get("/restaurants/:id", function (req, res) {
  const resID = req.params.id;
  const data = dbFuncs.readDB();

  for (const restaurant of data) {
		if (restaurant.id == resID) {
      return res.status(200).render("detailed", { restaurant: restaurant });
    }
  }
	res.status(404).render('404')
});

app.get("/recommend", function (req, res) {
  res.status(200).render("recommend");
});

app.post("/recommendRes", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const data = dbFuncs.readDB();

  data.push(restaurant);
  dbFuncs.writeDB(data);
  res.status(200).redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  res.status(200).render("confirm");
});

app.get("/about", function (req, res) {
  res.status(200).render("about");
});

app.use(function(req, res) {
	res.status(404).render('404')
});

app.use(function(error, req, res, next, ) {
  res.status(500).render('500')
});

app.listen(6969);
