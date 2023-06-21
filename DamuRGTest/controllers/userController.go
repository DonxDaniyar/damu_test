package controllers

import (
	"github.com/DonxDaniyar/DamuRGTest/initializers"
	"github.com/DonxDaniyar/DamuRGTest/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/wneessen/go-mail"
	"golang.org/x/crypto/bcrypt"
	"log"
	"os"
	"time"
)

func RegisterUser(c *fiber.Ctx) error {
	user := new(models.User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(500).SendString(err.Error())
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}
	user.Password = string(hash)
	initializers.DB.Create(&user)
	m := mail.NewMsg()
	if err := m.From("office@dreamstart.kz"); err != nil {
		log.Fatalf("failed to set From address: %s", err)
	}
	if err := m.To(user.Email); err != nil {
		log.Fatalf("failed to set To address: %s", err)
	}
	m.Subject("Successful registration!")
	m.SetBodyString(mail.TypeTextPlain, "Your register attempt completed successfully!")
	cm, err := mail.NewClient("smtp.mail.ru", mail.WithPort(465), mail.WithSMTPAuth(mail.SMTPAuthPlain),
		mail.WithUsername("office@dreamstart.kz"), mail.WithPassword("dBSqjt4MQvcLveMp6sER"), mail.WithSSL())
	if err != nil {
		log.Fatalf("failed to create mail client: %s", err)
	}
	if err := cm.DialAndSend(m); err != nil {
		log.Fatalf("failed to send mail: %s", err)
	}
	return c.Status(fiber.StatusCreated).JSON(user)
}
func LoginUser(c *fiber.Ctx) error {
	var body struct {
		Email    string
		Password string
	}
	if err := c.BodyParser(&body); err != nil {
		return c.Status(500).SendString(err.Error())
	}
	var user models.User
	initializers.DB.First(&user, "email = ?", body.Email)
	if user.ID == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid data",
		})
	}
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid data",
		})
	}
	// Create the Claims
	claims := jwt.MapClaims{
		"id":      user.ID,
		"surname": user.Surname,
		"name":    user.Name,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"token": t})
}
func Validate(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	name := claims["name"].(string)
	return c.SendString("Welcome " + name)
}
func GetMe(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	return c.JSON(claims)
}
func GetUsers(c *fiber.Ctx) error {
	var users []models.User
	initializers.DB.Order("ID DESC").Find(&users)
	return c.JSON(users)
}
func DeleteUser(c *fiber.Ctx) error {
	var user models.User
	id := c.Params("id")
	initializers.DB.Delete(&user, id)
	return c.JSON(user)
}
