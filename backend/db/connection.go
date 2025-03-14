package db

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	// Client is the MongoDB client instance
	Client *mongo.Client
	// Database is the MongoDB database instance
	Database *mongo.Database
)

// Connect establishes a connection to MongoDB
func Connect() error {
	// Get MongoDB URI from environment variable
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		uri = "mongodb://localhost:27017" // Default URI if not provided
	}

	// Get database name from environment variable
	dbName := os.Getenv("MONGODB_DATABASE")
	if dbName == "" {
		dbName = "unihack" // Default database name if not provided
	}

	// Set client options
	clientOptions := options.Client().ApplyURI(uri)

	// Connect to MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error
	Client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		return err
	}

	// Check the connection
	ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = Client.Ping(ctx, nil)
	if err != nil {
		return err
	}

	// Set the database
	Database = Client.Database(dbName)

	log.Println("Connected to MongoDB!")
	return nil
}

// Disconnect closes the MongoDB connection
func Disconnect() error {
	if Client == nil {
		return nil
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := Client.Disconnect(ctx)
	if err != nil {
		return err
	}

	log.Println("Disconnected from MongoDB!")
	return nil
}
