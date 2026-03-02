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
});