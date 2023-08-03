const mongoose = require("mongoose");
const Taskmodel = require("../model/Taskmodel");

//create task
const createTaskController = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (title && description) {
      const Task = await Taskmodel.create({ title, description });
      res.status(200).json(Task);
    } else {
      res
        .status(400)
        .json({ error: "Title and description are required fields" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getTaskController = async (req, res) => {
  try {
    const tasks = await Taskmodel.find({});
    if (!tasks) {
      return res.status(404).json({ error: "no Tasks found" });
    } else {
      res.status(200).json(tasks);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const deleteTaskController = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "no such id" });
    }

    const task = await Taskmodel.findByIdAndDelete({ _id: id });

    if (!task) {
      return res.status(404).json({ error: "no such task" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
  }
};

const updateTaskController = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "no such id" });
    }
    const tasks = await Taskmodel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!tasks) {
      return res.status(404).json({ error: "no such Task" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createTaskController,
  getTaskController,
  deleteTaskController,
  updateTaskController,
};
