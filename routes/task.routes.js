const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require("../controllers/task.controller");

const protect = require("../middleware/auth.middleware");

// Protected Task Routes
router.post("/", protect, createTask);     // Create Task
router.get("/", protect, getTasks);        // Get All Tasks
router.get("/:id", protect, getTask);      // Get Single Task
router.put("/:id", protect, updateTask);   // Update Task
router.delete("/:id", protect, deleteTask);// Delete Task

module.exports = router;