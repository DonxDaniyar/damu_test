package initializers

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
	"time"
)

var (
	Client     *mongo.Client
	Collection *mongo.Collection
)

func ConnectToMongo() {
	clientOptions := options.Client().ApplyURI(os.Getenv("MONGO_URL"))
	var err error
	Client, err = mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = Client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB.")
	database := Client.Database("damurgtest")
	Collection = database.Collection("logs")
}
