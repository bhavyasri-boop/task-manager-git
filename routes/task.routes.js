const express = require("express");
const router = express.Router();

const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
} = require("../controllers/task.controller");

// CREATE
router.post("/", createTask);

// GET ALL (Pagination + Filter + Search)
router.get("/", getTasks);

// GET SINGLE
router.get("/:id", getTask);

// UPDATE
router.put("/:id", updateTask);

// DELETE
router.delete("/:id", deleteTask);

module.exports = router;