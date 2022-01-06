const debug = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');

const genres = require('./routes/genre');
const customer = require('./routes/customer');

const app = express();

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('connected'))
  .catch((e) => console.error('Could not connect to db', e));

// Configuration ----------------------------------------------------------------------------

app.use(compression());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/genres', genres);
app.use('/api/customer', customer);

const port = config.get('port');
app.listen(port, () => {
  debug(`Listening to port ${port}`);
});
