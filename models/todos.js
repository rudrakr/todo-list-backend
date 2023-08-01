const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  listNumber:Number,
  listName: {
    type: String,
    required: true
  },
  isMandatory: {
    type: Boolean
  },
  completed:Boolean
})
const todoSchema = new mongoose.Schema({
  id: {
    required: true,
    type: String,
    unique: true
  },
  lists: [listSchema]
})

const Todos = new mongoose.model('todos', todoSchema);
module.exports = Todos;