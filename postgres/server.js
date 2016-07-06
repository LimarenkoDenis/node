const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loader = require('./lib/dispetcher');
const app = express();
const morgan = require('morgan');
const verify = require('./middleware/verify.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use(morgan('dev'));
app.use('/', verify.jwt);
loader.init(app);

app.listen(3000, () => {
  console.log(`backend started`);
});
