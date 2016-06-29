const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loader = require('./lib/dispetcher');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

loader.init(app);

app.listen(3000, () => {
  console.log(`beckend started`);
});
