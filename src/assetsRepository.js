const errorUtils  = require('./errorUtil');
const AWS = require('aws-sdk');

const inestimentsTable = process.env.INVESTIMENTS_TABLE;
const DYNAMODB_CLIENT = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  region: "us-east-1"
});

module.exports = {
  getAssets: getAssets
};

async function getAssets(account){
  try{
    console.log('assetsRepository::getAssets', account);
    const params = {
      TableName: inestimentsTable,
      Key: { id: account }
    };
    return await DYNAMODB_CLIENT.get(params).promise()
  }
  catch(error){
    console.log('assetsRepository::getAssets::error', error);
    throw { name : "Internal", message : errorUtils.knownErrors.INTERNAL, errors: []};
  }
}