const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

const assetsController = require('./src/assetsController');
const app = express();

var corsOptions = {
  origin: function(origin, callback) {
    console.log('allowing origin', origin);
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: [
    'Content-Type',
    'X-Amz-Date',
    'Authorization',
    'X-Api-Key',
    'X-Amz-Security-Token',
    'X-Amz-User-Agent'],
  exposedHeaders: [
    'access-control-allow-origin',
    'access-control-allow-credentials']
};

app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '6mb'}));
app.use(compression({filter: shouldCompress}));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};

const routePathGetAssets = '/assets/:email';
console.log('Adding get route...' + routePathGetAssets);
app.get(routePathGetAssets, assetsController.getAssets);

module.exports.handler = serverless(app);