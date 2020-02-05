const AWS = require('aws-sdk');

exports.handler = async function(event, context){
    //console.log(event);
    try {
        let requestBody = event.body
        console.log(requestBody);
        if(event.httpMethod === "POST"){
            AWS.config.update({
                region: requestBody.Region
            })
            const tranlsater = new AWS.Translate();
            console.log(requestBody.ApiParameter);
            var apiResponse = await tranlsater.translateText(requestBody.ApiParameter).promise();
            var body = {
                result: apiResponse
            };
            console.log(apiResponse)
            return {
                statusCode:200,
                headers: {},
                body: JSON.stringify(body)
            };
        }
        return {
            statusCode: 400,
            headers: {},
            body: "We only accept GET /"
        };
    } catch(error) {
        var body = error.stack || JSON.stringify(error, null, 2);
        return {
            statusCode: 400,
            headers: {},
            body: JSON.stringify(body)
        }
    }
}