package main

import (
	"database/sql"

	_ "modernc.org/sqlite"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
}

type TodoApp struct {
	db *sql.DB
}

func NewTodoApp() (*TodoApp, error) {
	db, err := sql.Open("sqlite", "todos.db")
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS todos (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		done BOOLEAN NOT NULL DEFAULT 0
	)`)
	if err != nil {
		return nil, err
	}

	return &TodoApp{db: db}, nil
}

func (a *TodoApp) AddTodo(title string) error {
	_, err := a.db.Exec("INSERT INTO todos (title, done) VALUES (?, ?)", title, false)
	return err
}

func (a *TodoApp) GetTodos() ([]Todo, error) {
	rows, err := a.db.Query("SELECT id, title, done FROM todos")
	if err != nil {
		return []Todo{}, err // بدل nil
	}
	defer rows.Close()

	var todos []Todo
	for rows.Next() {
		var t Todo
		if err := rows.Scan(&t.ID, &t.Title, &t.Done); err != nil {
			return []Todo{}, err
		}
		todos = append(todos, t)
	}
	return todos, nil
}

func (a *TodoApp) ToggleTodo(id int) error {
	_, err := a.db.Exec("UPDATE todos SET done = NOT done WHERE id = ?", id)
	return err
}

func (a *TodoApp) DeleteTodo(id int) error {
	_, err := a.db.Exec("DELETE FROM todos WHERE id = ?", id)
	return err
}
