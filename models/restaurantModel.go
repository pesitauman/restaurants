package models

import (
	"restaurants/db"

	_ "github.com/go-sql-driver/mysql"
)

type Restaurant struct {
	Id       int
	Name     string
	Type     string
	Phone    string
	Location string
}

func (restaurant *Restaurant) CreateOrUpdate() (err error) {
	_, err = db.GetDB().NamedExec("REPLACE INTO restaurant (name, type, phone, location) VALUES (:name, :type, :phone, :location)", &restaurant)
	return err
}

func (restaurant *Restaurant) Update() (err error) {
	_, err = db.GetDB().NamedExec("UPDATE restaurant SET name = :name, type = :type, phone = :phone, location = :location WHERE id = :id", &restaurant)
	return err
}

func (restaurant *Restaurant) Delete() (err error) {
	_, err = db.GetDB().NamedExec("DELETE FROM restaurant WHERE id = :id", &restaurant)
	return err
}

func GetAllRestaurants() (restaurants []Restaurant, err error) {
	err = db.GetDB().Select(&restaurants, "SELECT * FROM restaurant")
	return restaurants, err
}
