package s3

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/gin-gonic/gin"
)

func UploadFileHandler(c *gin.Context) {
	// Parse the multipart form data (upload file)
	file, fileHeader, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(400, gin.H{"error": fmt.Sprintf("Failed to parse form: %v", err)})
		return
	}
	defer file.Close()

	// Generate a unique filename (using the original file's base name and timestamp)
	fileName := fmt.Sprintf("%d-%s", time.Now().UnixNano(), filepath.Base(fileHeader.Filename))

	// Get AWS credentials from environment variables
	awsAccessKey := os.Getenv("AWS_ACCESS_KEY_ID")
	awsSecretKey := os.Getenv("AWS_SECRET_ACCESS_KEY")
	if awsAccessKey == "" || awsSecretKey == "" {
		c.JSON(500, gin.H{"error": "AWS credentials not found in environment variables"})
		return
	}

	// Set up S3 client
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("ap-southeast-2"), // Your AWS region
		Credentials: credentials.NewStaticCredentials(awsAccessKey, awsSecretKey, ""),
	})
	if err != nil {
		c.JSON(500, gin.H{"error": fmt.Sprintf("Failed to create AWS session: %v", err)})
		return
	}
	svc := s3.New(sess)

	// Upload the file to S3
	_, err = svc.PutObject(&s3.PutObjectInput{
		Bucket:      aws.String("image-pre-raw"), // Your S3 bucket name
		Key:         aws.String(fileName),         // S3 object key (filename)
		Body:        file,                         // File body to upload
		ContentType: aws.String("application/octet-stream"),
	})
	if err != nil {
		log.Println("Failed to upload file to S3:", err)
		c.JSON(500, gin.H{"error": "Failed to upload file to S3"})
		return
	}

	// Generate a URL for the uploaded file
	fileURL := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", "image-pre-raw", "ap-southeast-2", fileName)

	// Return the URL of the uploaded file
	c.JSON(200, gin.H{"message": "File uploaded successfully", "url": fileURL})
}
