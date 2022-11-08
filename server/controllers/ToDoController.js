const ToDoModel = require("../models/ToDoModel");

module.exports.getToDo = async (req, res) => {
  try {
    const todo = await ToDoModel.find();
    res.set(200).send(todo);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports.saveToDo = async (req, res) => {
  try {
    const { desc } = req.body;
    const newModel = await ToDoModel.create({ desc });
    console.log("Added");
    console.log(newModel);
    res.set(201).send(newModel);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

module.exports.deleteToDo = async (req, res) => {
  try {
    const { id } = req.body;
    await ToDoModel.findByIdAndDelete(id);
    res.set(200).send("deleted");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports.updateToDo = async (req, res) => {
  try {
    const { id, done } = req.body;
    console.log(done)
    await ToDoModel.findByIdAndUpdate(id, { done });
    res.set(200).send("Updated");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
