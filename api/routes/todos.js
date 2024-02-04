const express = require('express');
const router = express.Router();

const todoController = require('../controllers/TodoController');

router.get('/todo',todoController.getTodos);
router.post('/todo',todoController.addTodo);
router.get('/todo/:id',todoController.getTodoById);
router.put('/todo/:id',todoController.updateTodo);
router.delete('/todo/:id',todoController.deleteTodo);

module.exports = router;