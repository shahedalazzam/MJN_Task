const ToDo = require("../models/ToDoModels");

exports.CreateToDo = async (req, res) => {
  const { title } = req.body;
  console.log('title ',title);
  try {
    // const toDoExists = await ToDo.findOne({ title });
    // if (toDoExists) {
    //   return res.status(409).json({ message: "Name already exists" });
    // } else {
      const toDoCreate = await ToDo.create({ title });
      res.status(201).json({
        message: "Successfully created Name",
        data: {
          title: toDoCreate.title,
        },
      });
    // }
  } catch (error) {
    res.status(500).json({ error: "Cannot create Name" });
  }
};

exports.GetToDo = async (req, res) => {
  try {
    const toDos = await ToDo.find();
    res.status(200).json({
      data: {
        toDos,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Cannot find the items" });
  }
};

exports.DeleteToDo = async (req, res) => {
  const id = req.params.id;
  try {
    await ToDo.findByIdAndDelete(id);
    const newToDos = await ToDo.find();
    res.status(200).json({
      message: "Successfully deleted Name",
      data: {
        newToDos,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Cannot delete Name" });
  }
};

exports.UpdateToDo = async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  try {
    await ToDo.findByIdAndUpdate(id, { title }, { new: true });
    const updatedToDos = await ToDo.find()
    res.status(200).json({
      message: "Updated Item successfully",
      data: {
        updatedToDos,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Cannot update Item" });
  }
};

// exports.GetToDoById = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const toDo = await ToDo.findById(id);
//     res.status(200).json({
//       data: {
//         toDo,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Cannot find the item" });
//   }
// };

exports.MarkToDoAsComplete = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await ToDo.findById(id);
    const newIsCompletedValue = !todo.is_completed;

    await ToDo.updateOne(
      { _id: id },
      {
        $set: { is_completed: newIsCompletedValue },
      }
    );

    const updatedTodos = await ToDo.find();
    res.status(200).json({
      data: {
        updatedTodos,
      },
      message: `Todo has been marked as ${newIsCompletedValue ? 'completed' : 'incomplete'}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Cannot mark TODO item as complete" });
  }
};
