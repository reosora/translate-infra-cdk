import core = require("@aws-cdk/core");
import fs = require("fs");

export class Waf extends core.Construct {
  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    //WAF
    // Now, wafregional only support low level construct, so high level construct can not use construct in CfnWebACLAssociation
    // In this code. we load WAF CFn template and depoly with TranslateService, not associate yet.
    // You should associate by yourself.
    new core.CfnInclude(this, "ExistingInfrastructure", {
        template: JSON.parse(fs.readFileSync("src/cfn/WafTemplate.json").toString())
    });
  }
}