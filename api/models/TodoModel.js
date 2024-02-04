const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    completed:Boolean
});

module.exports = mongoose.model('Todo',todoSchema);