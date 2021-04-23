const assetsRepository = require('./assetsRepository')

module.exports = {
  getAssets: getAssets
};

async function getAssets(account){
  try{
    return await assetsRepository.getAssets(account);
  }
  catch(error){
    console.log('assetsService::getAssets::error');
    throw error;
  }
}