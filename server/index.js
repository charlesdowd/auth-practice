const express = require('express');
const volleyball = require('volleyball');

/* 
const morgan = require('morgan');
app.use(morgan('dev'));

morgan is an http request logger middlewear, helps us debug 
(log each incoming request)instead we will use volleyball, 
which essentially does the same thing but also logs the response as
*/

const app = express();

const auth = require('./auth/index');

app.use(volleyball);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World! Nodemon is working!'
  });
});

app.use('/auth', auth);

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});