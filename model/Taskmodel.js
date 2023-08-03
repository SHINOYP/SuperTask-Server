const { Descriptions } = require("antd");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Ongoing", "Finished"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
