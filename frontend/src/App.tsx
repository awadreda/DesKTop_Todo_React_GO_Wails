import { useEffect, useState } from "react";
import type { Todo } from "./types";
import "./App.css";

declare global {
  interface Window {
    go: {
      main: {
        TodoApp: {
          AddTodo: (title: string) => Promise<void>;
          GetTodos: () => Promise<Todo[]>;
          ToggleTodo: (id: number) => Promise<void>;
          DeleteTodo: (id: number) => Promise<void>;
        };
      };
    };
  }
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const loadTodos = async () => {
    try {
      const data = await window.go.main.TodoApp.GetTodos();
      setTodos(data ?? []);
    } catch (err) {
      console.error("Failed to load todos", err);
      setTodos([]);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    await window.go.main.TodoApp.AddTodo(newTodo);
    setNewTodo("");
    loadTodos();
  };

  const toggleTodo = async (id: number) => {
    await window.go.main.TodoApp.ToggleTodo(id);
    loadTodos();
  };

  const deleteTodo = async (id: number) => {
    await window.go.main.TodoApp.DeleteTodo(id);
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1 className="app-title">Todo List</h1>
        <div className="input-group">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter todo"
            className="todo-input"
          />
          <button onClick={addTodo} className="add-btn">
            Add
          </button>
        </div>
        <ul className="todo-list">
          {(todos ?? []).map((t) => (
            <li key={t.id} className="todo-item">
              <span
                onClick={() => toggleTodo(t.id)}
                className={`todo-text ${t.done ? "done" : ""}`}
              >
                {t.title}
              </span>
              <button
                onClick={() => deleteTodo(t.id)}
                className="delete-btn"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
