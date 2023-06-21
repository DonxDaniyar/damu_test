package main

import (
	"github.com/DonxDaniyar/DamuRGTest/initializers"
	"github.com/DonxDaniyar/DamuRGTest/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.User{})
}
