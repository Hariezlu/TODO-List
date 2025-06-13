const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory task array
let todos = [];

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST new todo
app.post("/todos", (req, res) => {
  const { text } = req.body;
  if (text && text.trim() !== "") {
    todos.push({ text, completed: false });
    res.status(201).json({ message: "Task added!" });
  } else {
    res.status(400).json({ message: "Task text is required." });
  }
});

// PUT toggle complete status
app.put("/todos/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (todos[index]) {
    todos[index].completed = !todos[index].completed;
    res.json({ message: "Task status updated." });
  } else {
    res.status(404).json({ message: "Task not found." });
  }
});

// DELETE task
app.delete("/todos/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (todos[index]) {
    todos.splice(index, 1);
    res.json({ message: "Task deleted." });
  } else {
    res.status(404).json({ message: "Task not found." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
