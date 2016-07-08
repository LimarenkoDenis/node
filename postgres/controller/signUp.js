const path = require('path');
const config = require(path.join(__dirname, '..', 'config', 'gmail.js'));
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(config.transport);
module.exports = {
  resources: 'signUp',
  'POST /signUp': (req, res) => {
    const recipient = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const mailOptions = {
      from: '"Fred" <foo@blurdybloop.com>',
      to: recipient,
      subject: 'Hello',
      text: 'http://localhost:8080/#/email/confirm',
      html: `<b><a href="http://localhost:8080/#/email/confirm/password=${password}&name=${name}">
        http://localhost:8080/#/email/confirm?password=${password}&name=${name}
        <a></b>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(`Message sent: ${info.response}`);
      return res.send('200');
    });
  },

  // 'GET /email/confirm': (req, res) => {
  //   console.log('obj');
  // }
};
