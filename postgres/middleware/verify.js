const express = require('express');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('./../config/config.json')[env];
const apiRoutes = express.Router();

module.exports = {
  apiRoutes: apiRoutes.use(function(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  })
}
