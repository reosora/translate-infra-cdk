const AWS = require('aws-sdk');

exports.handler = async function(event, context){
    //console.log(event);
    try {
        //const requestBody = event.body
        const requestJson = JSON.parse(event.body)
        console.log(requestJson);
        if(event.httpMethod === "POST"){
            console.log("region info")
            //console.log(requestBody.Region);
            console.log(requestJson.Region);
            AWS.config.update({
                region: requestJson.Region
            })
            const tranlsater = new AWS.Translate();
            console.log("api parameters below");
            //console.log(requestBody.ApiParameter);
            console.log(requestJson.ApiParameter);
            var apiResponse = await tranlsater.translateText(requestJson.ApiParameter).promise();
            console.log(apiResponse)
            return {
                statusCode:200,
                headers: {},
                body: JSON.stringify(apiResponse)
            };
        }
        return {
            statusCode: 401,
            headers: {},
            body: "We only accept POST /"
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