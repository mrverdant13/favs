const express = require('express');

const app = express();

app.use((_, res) => res.status(404).json({ message: 'Not found' }));
app.use((_, res) => res.status(500).json({ message: 'Internal server error' }));

module.exports = app;
