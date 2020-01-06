package controllers

import (
	"encoding/csv"
	"encoding/json"
	"net/http"
	"strconv"

	"restaurants/models"

	"github.com/gin-gonic/gin"
)

type RestaurantController struct{}

func (r *RestaurantController) Upload(ctx *gin.Context) {
	file, _, err := ctx.Request.FormFile("file")
	if err != nil {
		errResponse(ctx, err, http.StatusBadRequest)
		return
	}

	lines, err := csv.NewReader(file).ReadAll()
	if err != nil {
		errResponse(ctx, err, http.StatusBadRequest)
		return
	}
	validProps := map[string]bool{"Name": true, "Type": true, "Phone": true, "Location": true}

	props := make(map[string]int)
	for idx, s := range lines[0] {
		if !validProps[s] {
			errResponse(ctx, err, http.StatusBadRequest)
			return
		}
		props[s] = idx
	}

	for _, line := range lines[1:] {
		restaurant := models.Restaurant{
			Name:     line[props["Name"]],
			Type:     line[props["Type"]],
			Phone:    line[props["Phone"]],
			Location: line[props["Location"]],
		}
		err = restaurant.CreateOrUpdate()
		if err != nil {
			errResponse(ctx, err, http.StatusInternalServerError)
			return
		}
	}
	r.GetAll(ctx)
}

func (r *RestaurantController) Update(ctx *gin.Context) {
	var restaurant models.Restaurant

	err := json.NewDecoder(ctx.Request.Body).Decode(&restaurant)
	if err != nil {
		errResponse(ctx, err, http.StatusBadRequest)
		return
	}

	err = restaurant.Update()
	if err != nil {
		errResponse(ctx, err, http.StatusInternalServerError)
		return
	}

	ctx.JSON(http.StatusOK, restaurant)
}

func (r *RestaurantController) GetAll(ctx *gin.Context) {
	restaurants, err := models.GetAllRestaurants()
	if err != nil {
		errResponse(ctx, err, http.StatusInternalServerError)
		return
	}
	ctx.JSON(http.StatusOK, &restaurants)
}

func (r *RestaurantController) Search(ctx *gin.Context) {
	keyword := ctx.Param("keyword")
	restaurants, err := models.SearchRestaurants(keyword)
	if err != nil {
		errResponse(ctx, err, http.StatusInternalServerError)
	}
	ctx.JSON(http.StatusOK, &restaurants)
}

func (r *RestaurantController) Delete(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		errResponse(ctx, err, http.StatusBadRequest)
		return
	}

	restaurant := models.Restaurant{Id: id}
	err = restaurant.Delete()
	if err != nil {
		errResponse(ctx, err, http.StatusInternalServerError)
		return
	}

	ctx.JSON(http.StatusOK, struct{}{})
}

func errResponse(ctx *gin.Context, err error, errType int) {
	ctx.JSON(errType, gin.H{
		"error": err.Error(),
	})
	return
}
