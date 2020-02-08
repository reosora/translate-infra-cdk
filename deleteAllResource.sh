#!/bin/bash
echo "disassociated webACL from API Gateway"
region=$(aws configure get region)
restapiid=$(aws apigateway get-rest-apis | jq '.items[] | select(.name == "Translate Service") | .id' | sed 's/^.*"\(.*\)".*$/\1/')
gatewayarn="arn:aws:apigateway:$region::/restapis/$restapiid/stages/prod"
aws waf-regional disassociate-web-acl --resource-arn $gatewayarn

echo "Start deleting WAF for TranslationService's Api-Gateway"
aws cloudformation delete-stack --stack-name Waf4TranslateService

echo "Start deleting TranslateService by aws cdk"
echo y | cdk destroy

echo "Every Resource has been cleaned!!"