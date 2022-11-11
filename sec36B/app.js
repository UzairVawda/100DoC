const express = require("express");

const db = require("./data/database");

const todoRouter = require("./Routes/todo.router");

const app = express();

app.use(express.json());

app.use("/todo", todoRouter);

app.use(function (error, req, res, next) {
  console.log(error);
  res.status(500).json({
    message: "Something went wrong!",
  });
});

db.initDB()
  .then(function () {
    app.listen(7778);
  })
  .catch(function (error) {
    console.log(error)
    console.log("Connecting to the database failed!");
  });
