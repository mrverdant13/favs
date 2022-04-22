const express = require('express');
const { parsePagination } = require('../../../pagination.middleware');
const { parseSorting } = require('../../../sorting.middleware');
const {
  listFavsLists,
  createFavsList,
  getFavsList,
  removeFavsList,
  appendFavsListById,
} = require('./controller');
const { favsListFields } = require('./favs-list.entity');

const router = express.Router();

router
  .route('/') //
  .get(parsePagination, parseSorting(favsListFields), listFavsLists)
  .post(createFavsList);

router
  .route('/:id') //
  .get(appendFavsListById, getFavsList)
  .delete(appendFavsListById, removeFavsList);

module.exports = router;
