const express = require('express');

const app = express();

app.use((_, __, next) => next({ statusCode: 404, message: 'Not Found' }));
app.use((err, _, res) => {
  const { statusCode, message } = err;
  res
    .status(statusCode || 500)
    .json({ message: message || 'Internal Server Error' });
});

module.exports = app;
