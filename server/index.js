const express = require('express');
const { logErrorOnRequest } = require('./logger');
const reqIdSetter = require('./request-id');

const app = express();

// Set request IDs on each request.
app.use(reqIdSetter);

app.use((_, __, next) => next({ statusCode: 404, message: 'Not Found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, __) => {
  const { statusCode, message } = err;
  logErrorOnRequest(req, statusCode, message);
  res
    .status(statusCode || 500)
    .json({ message: message || 'Internal Server Error' });
});

module.exports = app;
