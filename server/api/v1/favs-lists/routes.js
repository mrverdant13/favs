const express = require('express');
const { parsePagination } = require('../../../pagination.middleware');
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
  .get(parsePagination, listFavsLists)
  .post(createFavsList);

router
  .route('/:id') //
  .get(appendFavsListById, getFavsList)
  .delete(appendFavsListById, removeFavsList);

module.exports = router;
