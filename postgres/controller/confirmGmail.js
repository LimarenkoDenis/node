const models = require('../models');

module.exports = {
  resources: 'confirm',
  'POST /email/confirm': (req, res) => {
    const defaultValue = {
      role: 'user',
    };
    const settings = Object.assign(defaultValue, req.query);
    return models.Users.create(settings)
    .then(() => {
      res.end('200');
    }).catch((e) => {
      console.log(JSON.stringify(e));
    });
  }
};
