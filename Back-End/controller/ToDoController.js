// const ToDo = require("../models/ToDoModels");

// exports.CreatToDo = async (req, res) => {
//   const { title } = req.body;
//   try {
//     const ToDoExist = await ToDo.find().catch((err) => {
//       console.log("Error: ", err);
//     });

//     if (ToDoExist) {
//       return res.status(409).json({ message: "Name already Exist" });
//     } else {
//       const ToDoCreate = await ToDo.create({
//         title,
//       });

//       res.status(201).json({
//         message: "Successful Create Name",
//         data: {
//           title: ToDoCreate.title,
//         },
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Cannot Create Name" });
//   }
// };

// exports.DeleteToDo = async (req, res) => {
//   const id = req.params.id;

//   await ToDo.findByIdAndDelete({ _id: id });

//   const newToDos = await ToDo.find();

//   res.status(200).json({
//     message: "Successful Delete Name",
//     data: {
//       newToDos,
//     },
//   });
// };

// exports.GetToDo = async (req, res) => {
//   try {
//     const ToDos = await ToDo.find();
//     res.status(200).json({
//       data: {
//         ToDos,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Cannot Find The Item" });
//   }
// };

// exports.UpadetToDo = async (req, res) => {
//   const id = req.params.id;
//   const { Name, Price, Color, Img, Brand, Size } = req.body;
//   const newToDo = await ToDo.findByIdAndUpdate(
//     { _id: id },
//     {
//       $set: {
//         Name,
//         Price,
//         Color,
//         Img,
//         Brand,
//         Size,
//       },
//     },
//     { new: true }
//   );

//   res.status(200).json({
//     message: "Edit Item successfully",
//     data: {
//       newToDo,
//     },
//   });
// };

// exports.GetToDoId = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const ToDo = await ToDo.findById({ _id: id });
//     res.status(200).json({
//       data: {
//         ToDo,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Cannot Find The Item" });
//   }
// };



const ToDo = require("../models/ToDoModels");

exports.CreateToDo = async (req, res) => {
  const { title } = req.body;
  try {
    const toDoExists = await ToDo.findOne({ title });
    if (toDoExists) {
      return res.status(409).json({ message: "Name already exists" });
    } else {
      const toDoCreate = await ToDo.create({ title });
      res.status(201).json({
        message: "Successfully created Name",
        data: {
          title: toDoCreate.title,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Cannot create Name" });
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

exports.UpdateToDo = async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  try {
    const updatedToDo = await ToDo.findByIdAndUpdate(id, { title }, { new: true });
    res.status(200).json({
      message: "Updated Item successfully",
      data: {
        title: updatedToDo.title,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Cannot update Item" });
  }
};

exports.GetToDoById = async (req, res) => {
  const id = req.params.id;
  try {
    const toDo = await ToDo.findById(id);
    res.status(200).json({
      data: {
        toDo,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Cannot find the item" });
  }
};

exports.MarkToDoAsComplete = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedToDo = await ToDo.findByIdAndUpdate(id, { is_completed: true }, { new: true });
    res.status(200).json({
      message: "Marked TODO item as complete",
      data: {
        title: updatedToDo.title,
        is_completed: updatedToDo.is_completed,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Cannot mark TODO item as complete" });
  }
};
