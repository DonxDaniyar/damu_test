package controllers

import (
	"context"
	"github.com/DonxDaniyar/DamuRGTest/initializers"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func GetLogs(c *fiber.Ctx) error {
	// Поиск всех документов
	cursor, err := initializers.Collection.Find(context.Background(), bson.D{})
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	defer cursor.Close(context.Background())

	// Срез для хранения результатов
	var documents []bson.M

	// Итерация по результатам поиска
	for cursor.Next(context.Background()) {
		var result bson.M
		err := cursor.Decode(&result)
		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}
		documents = append(documents, result)
	}

	if err := cursor.Err(); err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(documents)
}
