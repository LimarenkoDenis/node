const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const jwt = require('jsonwebtoken');
const models = require('../models');

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
          const tokenKey = jwt.sign(user.get({ plain: true }), config.secret, {
            expiresIn: 86400 // 24 hours
          });
          res.json({
            // user: user.role,
            success: true,
            message: 'Enjoy your token!',
            token: tokenKey
          });
        }
      }
    }).catch((e) => {
      console.log(JSON.stringify(e));
    });
  }
};
