import * as cdk from '@aws-cdk/core';
import translate_service = require('../lib/translate_service');
//import waf = require('../lib/waf');

export class TranslateInfraCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new translate_service.TranslateService(this, "translates");
    //new waf.Waf(this, "waf_cdn");
  }
}
