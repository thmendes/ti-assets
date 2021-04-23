const assetsService = require('./assetsService');
const authApi = require('./apis/authApi')
const errorUtil = require('./errorUtil');
const { crc32 } = require('crc');

module.exports = {
  getAssets: getAssets
};

async function getAssets(req, res){
  try{
    console.time('getAssets');
    console.log('assetsController::getAssets');
    if(!await validateUser(req.params.email, req.headers.authorization))
      throw {name: 'EMAIL_MALFORMED', message: errorUtil.knownErrors.EMAIL_MALFORMED, errors: []}
    
    const accountCode = generateAccoountCode(req.params.email);
    const response = await assetsService.getAssets(accountCode);
    res.json(response);
  }
  catch(error){
    console.log('assetsController::getAssets::error', error);
    const errorResponse = errorUtil.errorResponse(error.name, error.message, error.errors);
    res.status(errorResponse.statusCode).send(errorResponse.body);
  }
  finally{
    console.timeEnd('getAssets');
  }
}

function generateAccoountCode(email){
  return crc32(email).toString(16); 
}

async function validateUser(email, token){
  const user = await authApi.getUser(token);
  userEmail = user.UserAttributes.find(att => att.Name == 'email').Value;
  return email == userEmail;
}