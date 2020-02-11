# translate-infra-cdk
This is infrastructure code for [translate plugin](https://github.com/reosora/simple-a-translate) by AWS CDK and CloudFormation template.

# How to Use
Run `createAllResource.sh` to create resources. \
Note: You have to enter 'y' once to create infra by AWS CDK.

```
$./createAllResource.sh XXX.XXX.XX.XXX/XX
# XXX.XXX.XX.XXX/XX is IP address range you want to allow access api endopoint.
```

If you want to delete resources, run `deleteAllResource.sh`.

```
$./deleteAllResource.sh
```

# CDK TypeScript project

This is a project for TypeScript development with CDK. \
Note: Some resources made by CloudFormation, not using CDK.

The `cdk.json` file tells the CDK Toolkit how to execute app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
