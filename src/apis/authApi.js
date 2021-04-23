const axios = require('axios');
const authApiUrl = process.env.AUTH_API;
module.exports = {
  getUser: getUser
};

async function getUser(token){
  try{
    console.log('api::auth')
    const input = token.replace("Bearer ", "");
    const result = await axios.post(
      `${authApiUrl}/get-user`,
      {
        token: input
      }      
    );
    return result.data;
  }
  catch(error){
    console.log('api::auth::error', error);
    throw error;
  }

}