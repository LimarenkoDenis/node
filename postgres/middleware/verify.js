const jwt = require('jsonwebtoken');

module.exports = {
  jwt: function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, 'ilovescotchyscotch', (err, decoded) => {
        if (err) {
          req.role = 'guest'
          return res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        }
        req.role = 'admin';
        req.decoded = decoded;
        next();
      });
    } else {
      req.role = 'guest';
      next();
    }
  }
};
