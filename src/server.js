'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const upcoming = require('./api/upcoming');
const popular = require('./api/popular');
const topRated = require('./api/topRated');

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send('hello world!');
});

app.use('/upcoming', upcoming);
app.use('/popular', popular);
app.use('/top-rated', topRated);

module.exports = {
  app,
  start: port => {
    app.listen(port, () => console.log(`server working on ${port}`));
  },
};