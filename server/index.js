const express = require('express');

const app = express();

app.use((_, res) => res.status(404).json({ message: 'Not found' }));

module.exports = app;
