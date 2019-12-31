package main

import (
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"

	. "restaurants/controllers"
	"restaurants/db"
)

func main() {
	db.Init()
	defer db.Close()

	router := gin.Default()

	router.LoadHTMLGlob("ui-dist/*.html")
	router.LoadHTMLFiles("static/*/*")
	router.Static("/static", "./ui-dist/static")
	router.StaticFile("/restaurants", "ui-dist/index.html")

	restaurantController := RestaurantController{}
	router.POST("/api/restaurants/upload", restaurantController.Upload)
	router.GET("/api/restaurants", restaurantController.GetAll)
	router.PUT("/api/restaurants/:id", restaurantController.Update)
	router.DELETE("/api/restaurants/:id", restaurantController.Delete)

	router.Run(":8080")
}
