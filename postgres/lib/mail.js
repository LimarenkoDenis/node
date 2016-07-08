module.exports = (recipient, token) => {
  return {
    from: '"Fred" <foo@blurdybloop.com>',
    to: recipient,
    subject: 'Hello',
    html: `<b><a href="http://localhost:8080/#/email/confirm/${token}">
         http://localhost:8080/#/email/confirm?${token}
        <a></b>
        confirm your registration`
  };
};
