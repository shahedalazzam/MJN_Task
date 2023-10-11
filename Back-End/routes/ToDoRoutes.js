const express = require('express')
const router = express.Router()

const ToDoController = require('../controller/ToDoController')

router.route("/add").post(ToDoController.CreateToDo)
router.route("/delete/:id").delete(ToDoController.DeleteToDo)
router.route("/update/:id").patch(ToDoController.UpdateToDo)
router.route("/").get(ToDoController.GetToDo)
router.route("/updatemark/:id").patch(ToDoController.MarkToDoAsComplete)


module.exports = router