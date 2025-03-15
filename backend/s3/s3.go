package s3

import (
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"strings"
)

// Image struct for returning image URLs
type Image struct {
	URL string `json:"url"`
}

// Config struct for holding AWS credentials and config
type Config struct {
	AccessKey string
	SecretKey string
	Region    string
	Bucket    string
}

// DefaultConfig initializes the default configuration
func DefaultConfig() Config {
	return Config{
		Region: "ap-southeast-2",
		Bucket: "dest-img-unihack",
	}
}

// ListImages fetches the images from the S3 bucket and returns their URLs
func ListImages() ([]Image, error) {
	// Initialize the configuration struct
	config := DefaultConfig()

	// Get AWS credentials from environment variables
	config.AccessKey = os.Getenv("AWS_ACCESS_KEY_ID")
	config.SecretKey = os.Getenv("AWS_SECRET_ACCESS_KEY")

	// Check if the credentials are available
	if config.AccessKey == "" || config.SecretKey == "" {
		return nil, fmt.Errorf("AWS credentials not found in environment variables")
	}

	// Create a new session in the AWS region using the credentials from the config
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String(config.Region),
		Credentials: credentials.NewStaticCredentials(config.AccessKey, config.SecretKey, ""),
	})
	if err != nil {
		return nil, err
	}

	// Create an S3 service client
	svc := s3.New(sess)

	// List objects in the S3 bucket
	resp, err := svc.ListObjectsV2(&s3.ListObjectsV2Input{
		Bucket: aws.String(config.Bucket),
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

		imageURL := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", config.Bucket, config.Region, trimmedKey)
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
