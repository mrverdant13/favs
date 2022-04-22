const express = require('express');
const favsListsRouter = require('./favs-lists/routes');

const router = express.Router();

router.use('/favs', favsListsRouter);

module.exports = router;
