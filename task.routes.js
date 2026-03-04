const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask
} = require("../controllers/task.controller");

// ================= CREATE TASK =================
router.post("/", protect, createTask);

// ================= GET ALL TASKS =================
router.get("/", protect, getTasks);

// ================= GET SINGLE TASK =================
router.get("/:id", protect, getSingleTask);

// ================= UPDATE TASK =================
router.put("/:id", protect, updateTask);

// ================= DELETE TASK =================
router.delete("/:id", protect, deleteTask);

module.exports = router;