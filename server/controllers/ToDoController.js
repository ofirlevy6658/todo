const ToDoModel = require("../models/ToDoModel");

module.exports.getToDo = async (req, res) => {
  const { page, limit} = req.query;

  try {
    const todos = await ToDoModel.find()
      .limit((+limit) * 1)
      .skip(((+page) - 1) * (+limit))
      .exec();
    const count = await ToDoModel.countDocuments();

    res.set(200).send({
      todos,
      count,
      totalPages: Math.ceil(count / (+limit)),
      currentPage: +page,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
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
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.deleteToDo = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);
    const a = await ToDoModel.findByIdAndDelete(_id);
    console.log(a);
    res.set(200).send("deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.updateToDo = async (req, res) => {
  try {
    const { _id, done } = req.body;
    await ToDoModel.findByIdAndUpdate(_id, { done });
    res.set(200).send("Updated");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
