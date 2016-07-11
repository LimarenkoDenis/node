const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('./../config/config.json')[env];

module.exports = {
  jwt: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.send('403');
        }
        req.role = decoded.role;
        req.decoded = decoded;
        next();
      });
    } else {
      req.role = 'guest';
      next();
    }
  }
};
