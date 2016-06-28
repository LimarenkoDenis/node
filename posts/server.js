const express = require('express');
const app = express();
const loader = require('./lib/dispetcher');

loader.init()

app.listen(4000, () => {
  console.log(`beckend started`);
});
