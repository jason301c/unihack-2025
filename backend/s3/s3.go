package s3

import (
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
	"strings"
)

// Image struct for returning image URLs
type Image struct {
	URL string `json:"url"`
}

var (
	bucketName = "image-pre-raw"
	region     = "ap-southeast-2"
)

// ListImages fetches the images from the S3 bucket and returns their URLs
func ListImages() ([]Image, error) {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	// Get AWS credentials from environment variables
	accessKey := os.Getenv("AWS_ACCESS_KEY_ID")
	secretKey := os.Getenv("AWS_SECRET_ACCESS_KEY")
	if accessKey == "" || secretKey == "" {
		return nil, fmt.Errorf("AWS credentials not found in environment variables")
	}

	// Create a new session in the AWS region using the credentials from environment variables
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String(region),
		Credentials: credentials.NewStaticCredentials(accessKey, secretKey, ""),
	})
	if err != nil {
		return nil, err
	}

	// Create an S3 service client
	svc := s3.New(sess)

	// List objects in the S3 bucket
	resp, err := svc.ListObjectsV2(&s3.ListObjectsV2Input{
		Bucket: aws.String(bucketName),
	})
	if err != nil {
		return nil, err
	}

	// Prepare the image URLs
	images := []Image{}
	for _, item := range resp.Contents {
		// Trim spaces from the key
		trimmedKey := strings.TrimSpace(*item.Key)

		// Skip folders (keys ending with '/' OR objects with zero size)
		if trimmedKey == "" || trimmedKey[len(trimmedKey)-1] == '/' || *item.Size == 0 {
			continue
		}

		imageURL := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, trimmedKey)
		images = append(images, Image{URL: imageURL})
	}

	return images, nil
}

// ListS3ImagesHandler fetches the images from S3 and returns them as JSON
func ListS3ImagesHandler(c *gin.Context) {
	// Call the ListImages function
	images, err := ListImages()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the image URLs as JSON
	c.JSON(http.StatusOK, images)
}
