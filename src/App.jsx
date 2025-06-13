import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (task.trim() !== "") {
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: task }),
      });
      setTask("");
      fetchTasks();
    }
  };

  const deleteTask = async (index) => {
    await fetch(`http://localhost:5000/todos/${index}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  // Toggle complete
  const toggleComplete = async (index) => {
    await fetch(`http://localhost:5000/todos/${index}`, {
      method: "PUT",
    });
    fetchTasks();
  };

  return (
    <div className="todo">
      <h2>To-Do App</h2>
      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task"
          className="input"
        />
        <button onClick={addTask} className="add-btn">
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((item, index) => (
          <li
            key={index}
            className={`todo-item ${item.completed ? "completed" : ""}`}
          >
            <span>{item.text}</span>
            <div>
              <button
                onClick={() => toggleComplete(index)}
                className={`toggle-btn ${
                  item.completed ? "completed-btn" : ""
                }`}
              >
                {item.completed ? "Completed" : "✔️"}
              </button>
              <button onClick={() => deleteTask(index)} className="delete-btn">
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
