const todoController = require("../Controllers/todo.controllers");

const express = require("express");

const router = express.Router();

router.get("/", todoController.getAllTodos);

router.post("/", todoController.addTodo);

router.patch("/:id", todoController.updateTodo);

router.delete("/:id", todoController.deleteTodo);

module.exports = router;
