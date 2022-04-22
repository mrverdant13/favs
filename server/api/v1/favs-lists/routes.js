const express = require('express');
const {
  listFavsLists,
  createFavsList,
  getFavsList,
  removeFavsList,
  appendFavsListById,
} = require('./controller');

const router = express.Router();

router
  .route('/') //
  .get(listFavsLists)
  .post(createFavsList);

router
  .route('/:id') //
  .get(appendFavsListById, getFavsList)
  .delete(appendFavsListById, removeFavsList);

module.exports = router;
