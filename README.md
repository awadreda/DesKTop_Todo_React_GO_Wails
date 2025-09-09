📝 Todo App (Wails + Go + React + SQLite)
A desktop Todo application built with Wails v2.The backend is written in Go and uses SQLite as the database.The frontend is built with React + TypeScript (Vite).

📦 Requirements
Ensure you have the following tools installed before running or building:

Go (>= 1.20)
Node.js (>= 18) + npm or yarn
Wails CLI

Verify Wails is set up correctly:
wails doctor

🚀 Running in Development Mode
Clone the project:
git clone <your-repo-url>
cd todo-wails-go

Install dependencies:
npm install

Run the app in development mode:
wails dev

A desktop window with the React UI will open.
🛠️ Building for Production
To build an executable:
wails build

Output:

Windows: build/bin/todo-wails-go.exe
Linux: build/bin/todo-wails-go
macOS: build/bin/todo-wails-go.app

Run the executable directly.
⚠️ Notes for Linux
The binary is built for the specific Linux distribution used.A binary built on Ubuntu may not work on Arch, for example.
Solutions:

Build the binary on the target machine.
Create a portable static binary using musl:

wails build -tags netgo -ldflags '-extldflags "-static"'

📂 Project Structure
todo-wails-go/
├── frontend/         # React + TypeScript (Vite project)
├── main.go           # Entry point
├── todo.go           # Todo logic (Go + SQLite)
├── go.mod
├── go.sum
└── README.md

✨ Features

Modern design with Dark Mode and animations.
Embedded SQLite database (todos.db).
Lightweight and fast (Go + React + Wails).
Cross-platform: Windows, Linux, macOS.

📸 Screenshots
<img width="758" height="549" alt="image" src="https://github.com/user-attachments/assets/b2dc0d17-c1e3-457d-b5a6-31a30f07197c" />
👨‍💻 Author
Awad RedaGitHub: awadreda
