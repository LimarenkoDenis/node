const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loader = require('./lib/dispetcher');
const app = express();
const morgan = require('morgan');
// const verify = require('./middleware/verify.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// app.use('/api', verify.apiRoutes);
loader.init(app);
app.use(morgan('dev'));


app.listen(3000, () => {
  console.log(`backend started`);
});
