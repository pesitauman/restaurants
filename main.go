package main

import (
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"

	"restaurants/db"
	"restaurants/routes"
)

func main() {
	db.Init()
	defer db.Close()

	router := gin.Default()
	routes.Define(router)

	port, ok := os.LookupEnv("PORT")
	if !ok {
		port = "8080"
	}
	router.Run(":" + port)
}
