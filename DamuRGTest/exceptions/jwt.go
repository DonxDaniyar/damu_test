package exceptions

import "github.com/gofiber/fiber/v2"

func JwtError(c *fiber.Ctx, err error) error {
	if err.Error() == "Missing or malformed JWT" {
		return c.Status(fiber.StatusBadRequest).
			JSON(fiber.Map{
				"status":  "error",
				"message": "Missing or malformed token",
			})
	}
	return c.Status(fiber.StatusUnauthorized).
		JSON(fiber.Map{"status": "error",
			"message": "Invalid or expired token",
		})
}
