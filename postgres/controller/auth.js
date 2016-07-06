const models = require('../models');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const jwt = require('jsonwebtoken');

module.exports = {
  resources: 'authenticate',
  'POST /authenticate': (req, res) => {
    models.Users.findOne({
      where: {
        name: req.body.name
      }
    }).then((user) => {
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {
        if (user.password !== req.body.password) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {
          const token = jwt.sign(user.get({ plain: true }), config.secret, {
            expiresIn: 8886400
          });
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  }
};

models.sequelize
  .sync({
    force: false
  })
  .then(() => {
    console.log('auth module worked!');
  }, (err) => {
    console.log('An error occurred while creating the table:', err);
  });
