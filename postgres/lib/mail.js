module.exports = (recipient, token) => {
  return {
    from: '"Fred" <foo@blurdybloop.com>',
    to: recipient,
    subject: 'Hello',
    html: `<b><a href="http://localhost:8080/#/email/confirm/${token}">
         http://localhost:8080/#/email/confirm?${token}
        <a></b>`
  };
};

// const mailOptions = {
//   from: '"Fred" <foo@blurdybloop.com>',
//   to: recipient,
//   subject: 'Hello',
//   text: 'http://localhost:8080/#/email/confirm',
//   html: `<b><a href="http://localhost:8080/#/email/confirm/password=${password}&name=${name}">
//     http://localhost:8080/#/email/confirm?password=${password}&name=${name}
//     <a></b>`
// };
