const env = process.env.NODE_ENV || 'development';
const config = require('./../config/config.json')[env];
const jwt = require('jsonwebtoken');
const models = require('./../models');
const nodemailer = require('nodemailer');
const getMailOptions = require('./../lib/mail.js');
const transporter = nodemailer.createTransport(config.transport);

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
          const tokenKey = jwt.sign(user.get({
            plain: true
          }), config.secret, {
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
  },

  'POST /signUp': (req, res) => {
    const recipient = req.body.email;
    const token = jwt.sign(req.body, config.secret);
    const mailOptions = getMailOptions(recipient, token);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(`Message sent: ${info.response}`);
      return res.send('200');
    });
  },

  'GET /email/confirm': (req, res) => {
    const token = req.query.key;
    if (token) {
      const user = jwt.verify(token, config.secret);
      const defaultValue = {
        role: 'user',
      };
      const settings = Object.assign(defaultValue, user);
      return models.Users.create(settings)
        .then(() => {
          res.end('200');
        }).catch((e) => {
          console.log(JSON.stringify(e));
        });
    } else {
      return res.end('500')
    }
  }
};

//
// if (models.Users.findOne({
//     where: {
//       name: user.name,
//     }
//   })) {
//   return res.end('403');
// } else {
//   return models.Users.create(settings)
//     .then(() => {
//       res.end('200');
//     }).catch((e) => {
//       console.log(JSON.stringify(e));
//     });
