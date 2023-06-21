package loggers

import (
	"context"
	"fmt"
	"github.com/DonxDaniyar/DamuRGTest/initializers"
	"go.mongodb.org/mongo-driver/bson"
	"log"
)

func WriteToMongo(logString []byte) {
	document := bson.D{
		{Key: "Log", Value: string(logString)},
	}
	_, err := initializers.Collection.InsertOne(context.Background(), document)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Document inserted.")
}
