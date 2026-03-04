require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const protect = require("./middleware/auth.middleware");

const app = express();

// ===============================
// CONNECT DATABASE
// ===============================
connectDB();

// ===============================
// MIDDLEWARE
// ===============================
app.use(express.json());

// ===============================
// ROUTES
// ===============================

// Auth Routes
app.use("/api/auth", authRoutes);

// Task Routes
app.use("/api/tasks", taskRoutes);

// ===============================
// TEST PROTECTED ROUTE
// ===============================
app.get("/api/profile", protect, (req, res) => {
  return res.json({
    success: true,
    message: "Protected route accessed 🔐",
    userId: req.user._id
  });
});

// ===============================
// ROOT ROUTE
// ===============================
app.get("/", (req, res) => {
  return res.send("Task Manager API Running 🚀");
});

// ===============================
// 404 ROUTE HANDLER
// ===============================
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ===============================
// GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error(err);

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});