package routes

import (
	"restaurants/controllers"

	"github.com/gin-gonic/gin"
)

func Define(router *gin.Engine) {
	router.LoadHTMLGlob("ui-dist/*.html")
	router.LoadHTMLFiles("static/*/*")
	router.Static("/static", "./ui-dist/static")
	router.StaticFile("/restaurants", "ui-dist/index.html")

	restaurantController := controllers.RestaurantController{}
	router.POST("/api/restaurants/upload", restaurantController.Upload)
	router.GET("/api/restaurants", restaurantController.GetAll)
	router.GET("/api/restaurants/:keyword", restaurantController.Search)
	router.PUT("/api/restaurants/:id", restaurantController.Update)
	router.DELETE("/api/restaurants/:id", restaurantController.Delete)
}
