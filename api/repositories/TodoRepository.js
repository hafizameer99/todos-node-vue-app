const Todo = require('../models/TodoModel');
const mongoose = require('mongoose');

class TodoRepository {

    constructor(model) {
        this.model = model;
    }

    //Add Todo

    create(title) {
        const newTodo = { _id:new mongoose.Types.ObjectId, title:title, completed: false };
        const todo = new this.model(newTodo);
        return todo.save();
    }

    // Get All Todos
    getAllTodos() {
        return this.model.find();
    }

    // Get All Todos
    findById(id) {
        return this.model.findById(id);
    }

    // Delete Todo
    delete(id) {
        return this.model.findByIdAndDelete(id);
    }

    // Update Todo
    update(id,object) {
        return this.model.findByIdAndUpdate(id, { $set: { completed: object.completed } });
    }
}

module.exports = new TodoRepository(Todo);