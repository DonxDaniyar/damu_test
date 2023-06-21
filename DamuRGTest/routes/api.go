package routes

import (
	"encoding/json"
	"github.com/DonxDaniyar/DamuRGTest/controllers"
	"github.com/DonxDaniyar/DamuRGTest/exceptions"
	"github.com/DonxDaniyar/DamuRGTest/loggers"
	jwtware "github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"os"
	"time"
)

func ConfigureRoutes() {
	app := fiber.New(fiber.Config{
		ServerHeader: "DamuRG Test",
		AppName:      "DamuRG",
		JSONEncoder:  json.Marshal,
		JSONDecoder:  json.Unmarshal,
	})

	app.Static("/", "./public")
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "*",
	}))
	app.Use(logger.New(logger.Config{
		TimeFormat: time.RFC3339Nano,
		TimeZone:   "Asia/Shanghai",
		Done: func(c *fiber.Ctx, logString []byte) {
			if c.Response().StatusCode() != fiber.StatusOK {
				loggers.WriteToMongo(logString)
			}
		},
	}))
	api := app.Group("api/v1")

	api.Get("logs", controllers.GetLogs)
	api.Post("sign-up", controllers.RegisterUser)
	api.Post("sign-in", controllers.LoginUser)

	userApi := api.Group("/user")
	userApi.Use(jwtware.New(jwtware.Config{
		SigningKey:   jwtware.SigningKey{Key: []byte(os.Getenv("SECRET"))},
		ErrorHandler: exceptions.JwtError,
	}))
	userApi.Get("test", controllers.Validate)
	userApi.Get("me", controllers.GetMe)
	userApi.Get("all", controllers.GetUsers)
	userApi.Delete("/delete/:id", controllers.DeleteUser)
	app.Listen(os.Getenv("PORT"))
}
