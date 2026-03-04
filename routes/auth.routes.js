const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");

// ======================================
// AUTH ROUTES
// ======================================

// Register User
// POST /api/auth/register
router.post("/register", register);

// Login User (returns JWT token)
// POST /api/auth/login
router.post("/login", login);

module.exports = router;