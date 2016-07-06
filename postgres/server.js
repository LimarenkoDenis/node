const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loader = require('./lib/dispetcher');
const app = express();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
// const verify = require('./middleware/verify.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// app.use('/api', verify.apiRoutes);
app.use(morgan('dev'));
app.use('/', function (req, res, next) {
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
    req.role = 'guest'
    next();
  }
});
loader.init(app);

app.listen(3000, () => {
  console.log(`backend started`);
});
