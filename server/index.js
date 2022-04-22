const express = require('express');
const { logErrorOnRequest, reqLogger } = require('./logger');
const reqIdSetter = require('./request-id');

const app = express();

// Process JSON payload.
app.use(express.json());

// Set request IDs on each request.
app.use(reqIdSetter);

// Log every incoming request.
app.use(reqLogger);

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
