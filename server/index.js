const express = require('express');
const { logErrorOnRequest, reqLogger } = require('./logger');
const reqIdSetter = require('./request-id');
const apiV1 = require('./api/v1');

const app = express();

// Process JSON payload.
app.use(express.json());

// Set request IDs on each request.
app.use(reqIdSetter);

// Log every incoming request.
app.use(reqLogger);

// Plug API routes into the app.
// Using the V1 implementation as default.
app.use('/api', apiV1);
app.use('/api/v1', apiV1);

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
