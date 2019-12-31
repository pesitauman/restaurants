package controllers

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"restaurants/models"

	"github.com/gin-gonic/gin"
)

type RestaurantController struct{}

func (r *RestaurantController) Upload(ctx *gin.Context) {
	file, _, err := ctx.Request.FormFile("file")
	if err != nil {
		ctx.String(http.StatusBadRequest, fmt.Sprintf("get form err: %s", err.Error()))
		return
	}

	lines, err := csv.NewReader(file).ReadAll()
	if err != nil {
		return
	}

	props := make(map[string]int)
	for idx, s := range lines[0] {
		props[s] = idx
	}

	for _, line := range lines[1:] {
		restaurant := models.Restaurant{
			Name:     line[props["Name"]],
			Type:     line[props["Type"]],
			Phone:    line[props["Phone"]],
			Location: line[props["Location"]],
		}
		restaurant.CreateOrUpdate()
	}
	r.GetAll(ctx)
}

func (r *RestaurantController) Update(ctx *gin.Context) {
	var restaurant models.Restaurant
	err := json.NewDecoder(ctx.Request.Body).Decode(&restaurant)
	if err == nil {
		err = restaurant.Update()
		if err == nil {
			ctx.JSON(http.StatusOK, restaurant)
			return
		}
	}
	errResponse(ctx, err)
}

func (r *RestaurantController) GetAll(ctx *gin.Context) {
	restaurants, err := models.GetAllRestaurants()
	if err != nil {
		errResponse(ctx, err)
	}
	ctx.JSON(http.StatusOK, &restaurants)
}

func (r *RestaurantController) Delete(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))

	if err == nil {
		restaurant := models.Restaurant{Id: id}
		err = restaurant.Delete()
		if err == nil {
			ctx.JSON(http.StatusOK, struct{}{})
			return
		}
	}
	errResponse(ctx, err)
}

func errResponse(ctx *gin.Context, err error) {
	ctx.JSON(500, gin.H{
		"error": err.Error(),
	})
}
