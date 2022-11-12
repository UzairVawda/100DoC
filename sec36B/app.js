const express = require("express");

const db = require("./data/database");

const todoRouter = require("./Routes/todo.router");

const enableCors = require("./Middleware/Cors.middleware");

const app = express();

app.use(enableCors);
app.use(express.json());

app.use("/todo", todoRouter);

app.use(function (error, req, res, next) {
  res.status(500).json({
    message: "Something went wrong!",
  });
});

db.initDB()
  .then(function () {
    app.listen(7778);
  })
  .catch(function (error) {
    console.log("Connecting to the database failed!");
  });
