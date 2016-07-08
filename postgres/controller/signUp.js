const path = require('path');
const config = require(path.join(__dirname, '..', 'config', 'gmail.js'));
const models = require('../models');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(config.transport);

module.exports = {
  resources: 'signUp',
  'POST /signUp': (req, res) => {
    const recipient = req.body.email;
    if(recipient){
      const mailOptions = {
        from: '"Fred" <foo@blurdybloop.com>', // sender address
        to: recipient, // list of receivers
        subject: 'Hello', // Subject line
        // text: 'http://localhost:8080/#/email/confirm', // plaintext body
        html: ` <b><a href="http://localhost:8080/#/email/confirm">
        http://localhost:8080/#/email/confirm
        <a></b>` // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        res.send('200')
      });
    }else{
      res.end('403')
    }
  }
};
