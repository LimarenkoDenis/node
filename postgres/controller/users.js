const models = require('../models');
module.exports = {
  resources: 'users',
  'GET /users': (req, res) => {
    models.Users.findAll()
    .then(users => {
      res.send(users);
    }).catch((e) => {
      console.log(JSON.stringify(e));
    });
  }
};
