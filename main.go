package main

import (
	"embed"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed frontend/dist
var assets embed.FS

func main() {
	todoApp, err := NewTodoApp()
	if err != nil {
		log.Fatal(err)
	}

	err = wails.Run(&options.App{
		Title:  "Todo App React TS",
		Width:  800,
		Height: 600,
		AssetServer: &assetserver.Options{
			Assets: assets, // هنا بيخلي React frontend يشتغل جوه الـ app
		},
		Bind: []interface{}{
			todoApp, // expose backend
		},
	})
	if err != nil {
		log.Fatal(err)
	}
}
