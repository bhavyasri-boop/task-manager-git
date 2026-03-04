<<<<<<< HEAD
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const protect = require("./middleware/auth.middleware");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(express.json());


// ===============================
// DATABASE CONNECTION
// ===============================
connectDB();


// ===============================
// ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


// ===============================
// TEST PROTECTED ROUTE
// ===============================
app.get("/api/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed 🔐",
    userId: req.user._id
  });
});


// ===============================
// ROOT ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("Task Manager API Running 🚀");
});


// ===============================
// 404 HANDLER
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


// ===============================
// GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
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
=======
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const protect = require("./middleware/auth.middleware"); 
const taskRoutes = require("./routes/task.routes"); 

const app = express();

app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes); 

// Protected Route
app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed 🔐",
    userId: req.user.id
  });
});

app.get("/", (req, res) => {
  res.send("Task Manager API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
>>>>>>> 09f2d6683acedd1b0e50202e7166da04df8a1e21
});