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
    const { _id } = req.body;
    console.log(_id)
    const a = await ToDoModel.findByIdAndDelete(_id);
    console.log(a)
    res.set(200).send("deleted");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports.updateToDo = async (req, res) => {
  try {
    const { _id, done } = req.body;
    await ToDoModel.findByIdAndUpdate(_id, { done });
    res.set(200).send("Updated");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
