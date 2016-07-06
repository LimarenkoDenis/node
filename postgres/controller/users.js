const models = require('../models');
module.exports = {
  resources: 'users',
  'GET /users': (req, res) => {
    models.Users.findAll().then(users => {
      res.send(users);
    });
  }
};

models.sequelize
  .sync({
    force: false
  })
  .then(() => {
    console.log('users module worked!');
  }, (err) => {
    console.log('An error occurred while creating the table:', err);
  });
