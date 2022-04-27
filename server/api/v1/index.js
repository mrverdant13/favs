const express = require('express');
const usersRouter = require('./users/routes');
const favsListsRouter = require('./favs-lists/routes');
const favItemsRouter = require('./fav-items/routes');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/favs', favsListsRouter);
router.use('/fav-items', favItemsRouter);

module.exports = router;
