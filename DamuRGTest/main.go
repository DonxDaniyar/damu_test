package main

import (
	"github.com/DonxDaniyar/DamuRGTest/initializers"
	"github.com/DonxDaniyar/DamuRGTest/models"
	"github.com/DonxDaniyar/DamuRGTest/routes"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.ConnectToMongo()
}

func main() {
	initializers.DB.AutoMigrate(&models.User{})
	routes.ConfigureRoutes()
}
