const express = require('express');
const swaggerUi = require('swagger-ui-express');

const usersRouter = require('./users/routes');
const favsListsRouter = require('./favs-lists/routes');
const favItemsRouter = require('./fav-items/routes');

const swaggerDoc = require('./docs');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/favs', favsListsRouter);
router.use('/fav-items', favItemsRouter);

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDoc));

module.exports = router;
