#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaProcessor } from '../lib/lambda-processing-cdk-stack';

const app = new cdk.App();
new LambdaProcessor(app, 'LambdaProcessor', {
  env: { account: '361769600773', region: 'ap-southeast-2' },
});