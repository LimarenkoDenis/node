const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loader = require('./lib/dispetcher');
const app = express();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

loader.init(app);
app.set('superSecret', config.secret);
app.use(morgan('dev'));

const apiRoutes = express.Router();
apiRoutes.use(function(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), (err, decoded) => {
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
});
app.use('/api', apiRoutes);

app.listen(3000, () => {
  console.log(`backend started`);
});
