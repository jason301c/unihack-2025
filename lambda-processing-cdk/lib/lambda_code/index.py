import json
import boto3
import os
import tempfile
import requests
from urllib.parse import quote_plus

s3 = boto3.client("s3")

def lambda_handler(event, context):
    source_bucket = os.environ["SOURCE_BUCKET"]
    destination_bucket = os.environ["DESTINATION_BUCKET"]
    api_key = os.environ["API_KEY"]  # API Key for PicsArt, stored in environment variable

    # Get object key
    object_key = event["Records"][0]["s3"]["object"]["key"]
    object_url = f"https://{source_bucket}.s3.amazonaws.com/{quote_plus(object_key)}"  # URL-encode the object key

    try:
        # Send the image URL to the PicsArt API for background removal
        url = "https://api.picsart.io/tools/1.0/removebg"
        payload = {
            "format": "PNG",
            "output_type": "cutout",
            "image_url": object_url
        }
        headers = {
            "accept": "application/json",
            "x-picsart-api-key": api_key  # Your PicsArt API key
        }

        # Send request to PicsArt API
        response = requests.post(url, headers=headers, data=payload)

        # Check if the response is successful
        if response.status_code == 200:
            processed_image_url = response.json().get("data").get("url")

            # Download the processed image
            temp_output_file = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
            response = requests.get(processed_image_url)
            with open(temp_output_file.name, "wb") as f:
                f.write(response.content)

            # Upload processed image to destination S3 bucket
            s3.upload_file(temp_output_file.name, destination_bucket, object_key)

            # Delete the processed file from the source S3 bucket
            s3.delete_object(Bucket=source_bucket, Key=object_key)

            # Clean up temporary files
            os.remove(temp_output_file.name)

            print(f"File {object_key} processed, moved to {destination_bucket}, and deleted from source bucket.")
            return {"statusCode": 200, "body": json.dumps("File processed, moved, and deleted successfully")}
        else:
            print(f"Error from PicsArt API: {response.text}")
            return {"statusCode": 500, "body": json.dumps(f"Error from PicsArt API: {response.text}")}

    except Exception as e:
        print(f"Error processing file {object_key}: {str(e)}")
        return {"statusCode": 500, "body": json.dumps(f"Error processing file: {str(e)}")}
