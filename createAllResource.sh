#!/bin/bash

iprange=$1

echo "Start making TranslateService by aws cdk"
npm run build
cdk deploy # you have to enter y bacause --require-approval option is enabled

echo "cdk deploy has done, sleep a little moment..."
sleep 10

echo "Get Api-Gateway ARN information"
# aws api-gateway
region=$(aws configure get region)
restapiid=$(aws apigateway get-rest-apis | jq '.items[] | select(.name == "Translate Service") | .id' | sed 's/^.*"\(.*\)".*$/\1/')

gatewayarn="arn:aws:apigateway:$region::/restapis/$restapiid/stages/prod"

echo "region:$region, restapiid:$restapiid, gatewayarn:$gatewayarn, iprange:$iprange"
echo "Start making WAF for TranslationService's Api-Gateway"
stackid=$(aws cloudformation create-stack --stack-name Waf4TranslateService \
     --template-body file://./src/cfn/WafTemplate.json \
     --parameters ParameterKey=ApiGatewayArnParameter,ParameterValue=$gatewayarn \
     ParameterKey=IPRange,ParameterValue=$iprange \
     | jq '.StackId' | sed 's/^.*"\(.*\)".*$/\1/')

regex='.*_COMPLETE$'
state="INITIAL"

while [[ ! $state =~ $regex ]]
do
  state=$(aws cloudformation describe-stacks --stack-name $stackid | jq .Stacks[].StackStatus | sed 's/^.*"\(.*\)".*$/\1/')
  echo $state
  sleep 10
done

echo "Every Resource Creation has done!!"