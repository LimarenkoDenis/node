const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('./../config/config.json')[env];
let role = 'guest';


const token = req.body.token || req.query.token || req.headers['x-access-token'];
if (token) {
  jwt.verify(token, 'ilovescotchyscotch', (err, decoded) => {
    if (err) {
      role = 'guest'
      return res.json({
        success: false,
        message: 'Failed to authenticate token.'
      });
    }
    role = 'admin';
    req.decoded = decoded;
    next();
  });
} else {
  role = 'guest'
}

module.exports = role;
