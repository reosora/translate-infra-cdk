#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TranslateInfraCdkStack } from '../lib/translate-infra-cdk-stack';

const app = new cdk.App();
new TranslateInfraCdkStack(app, 'TranslateInfraCdkStack');
