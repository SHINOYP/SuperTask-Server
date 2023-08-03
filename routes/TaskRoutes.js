const express = require("express");

const {
  createTaskController,
  getTaskController,
  deleteTaskController,
  updateTaskController,
} = require("../controller/TaskController");
const { model } = require("mongoose");

const router = express.Router();

router.post("/create-task", createTaskController);

router.get("/get-tasks", getTaskController);

router.delete("/:id", deleteTaskController);

router.patch("/:id", updateTaskController);

module.exports = router;
