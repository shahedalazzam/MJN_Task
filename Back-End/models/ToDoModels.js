const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
  {
    title: String,
    due_date: {
      type: Date,
      default: Date.now, 
    },
    is_completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ToDo = mongoose.model("ToDo", toDoSchema);

module.exports = ToDo;
