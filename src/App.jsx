import "./App.css";
import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = { text: task, completed: false };
      setTodos([...todos, newTask]);
      setTask("");
      //alert("Task added!");
    }
  };

  const deleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    alert("Task deleted!");
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTodos(updatedTodos);
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
                {item.completed ? "completed" : "✔️"}
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
