import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3assets from 'aws-cdk-lib/aws-s3-assets'; // For uploading assets to S3
import * as s3Notifications from 'aws-cdk-lib/aws-s3-notifications';
import * as events from 'aws-cdk-lib/aws-events';
import * as eventsTargets from 'aws-cdk-lib/aws-events-targets';
import * as path from 'path';

export class LambdaProcessor extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the source S3 bucket
    const sourceBucket = new s3.Bucket(this, 'SourceBucket', {
      bucketName: "src-img-unihack", // Set the bucket name
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Only for dev/test environments
    });

    // Create the destination S3 bucket
    const destinationBucket = new s3.Bucket(this, 'DestinationBucket', {
      bucketName: "dest-img-unihack", // Set the bucket name
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Only for dev/test environments
    });

    // Upload the Lambda Layer zip (layer.zip) to S3
    const layerAsset = new s3assets.Asset(this, 'RembgLayerAsset', {
      path: path.join(__dirname, 'layers', 'python.zip'), // Path to your layer.zip
    });

    // Create the Lambda Layer from the uploaded asset
    const rembgLayer = new lambda.LayerVersion(this, 'RembgLayer', {
      code: lambda.Code.fromBucket(layerAsset.bucket, layerAsset.s3ObjectKey),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_9], // Python runtime
      description: 'Layer for rembg and dependencies',
    });

    // Define the Lambda function
    const fileMoverLambda = new lambda.Function(this, 'FileMoverLambda', {
      runtime: lambda.Runtime.PYTHON_3_9, // Using Python runtime
      handler: 'index.lambda_handler', // Python handler function name
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda_code')), // Point to the lambda_code directory
      environment: {
        SOURCE_BUCKET: sourceBucket.bucketName,
        DESTINATION_BUCKET: destinationBucket.bucketName,
        API_KEY: process.env.API_KEY || '',
      },
      layers: [rembgLayer], // Attach the layer
    });

    // Grant the Lambda function permissions to read from the source bucket and write to the destination bucket
    sourceBucket.grantRead(fileMoverLambda);
    destinationBucket.grantWrite(fileMoverLambda);

    // Create an EventBridge rule to listen for PUT events in the source bucket
    const rule = new events.Rule(this, 'S3PutEventRule', {
      eventPattern: {
        source: ['aws.s3'],
        detailType: ['AWS API Call via CloudTrail'],
        detail: {
          eventSource: ['s3.amazonaws.com'],
          eventName: ['PutObject'],
          requestParameters: {
            bucketName: [sourceBucket.bucketName],
          },
        },
      },
    });

    // Set the Lambda function as the target for the EventBridge rule
    rule.addTarget(new eventsTargets.LambdaFunction(fileMoverLambda));

    // Add a notification to the source bucket to trigger the rule
    sourceBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED_PUT,
      new s3Notifications.LambdaDestination(fileMoverLambda)
    );
  }
}
