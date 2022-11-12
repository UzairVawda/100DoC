const { text } = require("express");
const Todo = require("../Models/todo.model");

async function getAllTodos(req, res, next) {
  let allTodos;
  try {
    allTodos = await Todo.getAllTodos();
  } catch (error) {
    return next(error);
  }
  res.json({
    todos: allTodos,
  });
}

async function addTodo(req, res, next) {
  const todoText = req.body.text;
  const todo = new Todo(todoText);

  let insertedId;
  try {
    const result = await todo.save();
    insertedId = result.insertedId;
  } catch (error) {
    return next(error);
  }
  todo.id = insertedId.toString();

  res.json({ message: "Added todo successfully!", createdTodo: todo });
}

async function updateTodo(req, res, next) {
  const todoID = req.params.id;
  const newTodoText = req.body.newText;
  const todo = new Todo(newTodoText, todoID);

  try {
    await todo.save();
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Updated todo", updatedTodo: todo });
}

async function deleteTodo(req, res, next) {
  const todoID = req.params.id;

  const todo = new Todo(null, todoID);

  try {
    await todo.delete();
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Deleted todo" });
}

module.exports = {
  getAllTodos: getAllTodos,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
