const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const models = require('../models');

module.exports = {
  resources: 'signUp',
  'POST /signUp': (req, res) => {
    res.send('200')
  }
};
