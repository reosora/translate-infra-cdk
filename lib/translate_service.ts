import core = require("@aws-cdk/core");
import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
//import wafv2 = require('@aws-cdk/aws-wafv2');

export class TranslateService extends core.Construct {
  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    const handler = new lambda.Function(this, "TranslateHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.asset("src/lambda"),
      handler: "translate.handler"
    });

    const api = new apigateway.RestApi(this, "translate-cdk-api", {
      restApiName: "Translate Service",
      description: "This service serves Amazon Translate."
    });

    const getTranslateIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("POST", getTranslateIntegration); // GET /
  }
}