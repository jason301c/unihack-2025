import json
import boto3
import os
import tempfile
from rembg import remove
from PIL import Image

s3 = boto3.client("s3")

def lambda_handler(event, context):
    source_bucket = os.environ["SOURCE_BUCKET"]
    destination_bucket = os.environ["DESTINATION_BUCKET"]

    # Get object key
    object_key = event["Records"][0]["s3"]["object"]["key"]

    try:
        # Download the image from S3
        temp_input_file = tempfile.NamedTemporaryFile(delete=False)
        temp_output_file = tempfile.NamedTemporaryFile(delete=False, suffix=".png")

        s3.download_file(source_bucket, object_key, temp_input_file.name)

        # Process the image
        with Image.open(temp_input_file.name) as img:
            output = remove(img)
            output.save(temp_output_file.name, "PNG")

        # Upload processed image to destination S3 bucket
        s3.upload_file(temp_output_file.name, destination_bucket, object_key)

        # Clean up temporary files
        os.remove(temp_input_file.name)
        os.remove(temp_output_file.name)

        print(f"File {object_key} processed and moved successfully.")
        return {"statusCode": 200, "body": json.dumps("File processed successfully")}

    except Exception as e:
        print(f"Error processing file {object_key}: {str(e)}")
        return {"statusCode": 500, "body": json.dumps(f"Error processing file: {str(e)}")}
