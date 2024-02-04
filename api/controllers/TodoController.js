const Todo = require('../models/TodoModel');
const todoRepository = require('../repositories/TodoRepository');

//Get All Todos
exports.getTodos = (req,res,next) => {
    todoRepository.getAllTodos()
    .then(result => {
        res.status(200).json({
            msg:'Todos has been fetched successfully!',
            allTodos:result
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
}

// Add Todo
exports.addTodo = (req,res,next) => {
    todoRepository.create(req.body.title)
    .then(result => {
        res.status(200).json({
            msg:'Todos has been created successfully!',
            allTodos:result
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
}

// Get Todo By Id
exports.getTodoById = (req,res,next) => {
    todoRepository.findById(req.params.id)
    .then(result => {
        res.status(200).json({
            msg:'Todo has been fetched successfully!',
            todo:result
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
}

// Update Todo
exports.updateTodo = (req,res,next) => {
    const id = req.params.id;
    const data = {completed: req.body.completed};
    todoRepository.update(id,data)
    .then(result => {
        res.status(200).json({
            msg:'Todo has been updatd successfully!',
            todo:result
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
}

// Delete Todo
exports.deleteTodo = (req,res,next) => {
    todoRepository.delete(req.params.id)
    .then(result => {
        res.status(200).json({
            msg:'Todo has been deleted successfully!',
            todo:result
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
}

