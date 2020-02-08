import core = require("@aws-cdk/core");
import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
/*
import iam = require("@aws-cdk/aws-iam");
import wafregional = require("@aws-cdk/aws-wafregional");
import fs = require("fs");
*/

export class TranslateService extends core.Construct {
  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    const handler = new lambda.Function(this, "TranslateHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.asset("src/lambda"),
      handler: "translate.handler"
    });

    handler.role?.addManagedPolicy({
      managedPolicyArn: "arn:aws:iam::aws:policy/TranslateReadOnly"
    })

    const api = new apigateway.RestApi(this, "translate-cdk-api", {
      restApiName: "Translate Service",
      description: "This service serves Amazon Translate."
    });

    const getTranslateIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("POST", getTranslateIntegration); // POST /

    // set WAF to API Gateway
    // Now, wafregional only support low level construct, so high level construct can not use construct in CfnWebACLAssociation
    /*
    new core.CfnInclude(this, "ExistingInfrastructure", {
        template: JSON.parse(fs.readFileSync("src/cfn/WafTemplate.json").toString())
    });
    const wafAclId = core.Fn.getAtt("WAFRWAC40DUT", "RootResourceId");
    const association = new wafregional.CfnWebACLAssociation(this, "WafAssociation", {
        resourceArn: api.arnForExecuteApi("GET", api.root.path, api.deploymentStage.stageName),
        webAclId: wafAclId
    });
    */
  }
}