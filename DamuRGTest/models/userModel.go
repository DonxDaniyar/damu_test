package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Surname  string `json:"surname" binding:"required"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password" binding:"required"`
	Phone    string `gorm:"unique, not null" json:"phone" binding:"required"`
}
