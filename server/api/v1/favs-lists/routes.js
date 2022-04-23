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
const { favsListSortingFields } = require('./favs-list.entity');

const router = express.Router();

router
  .route('/') //
  .get(parsePagination, parseSorting(favsListSortingFields), listFavsLists)
  .post(createFavsList);

router
  .route('/:id') //
  .get(appendFavsListById, getFavsList)
  .delete(appendFavsListById, removeFavsList);

module.exports = router;
