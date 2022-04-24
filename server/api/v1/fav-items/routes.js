const express = require('express');
const { parsePagination } = require('../../../pagination.middleware');
const { parseSorting } = require('../../../sorting.middleware');
const {
  listFavItems,
  createFavItem,
  getFavItem,
  editFavItem,
  removeFavItem,
  appendFavItemById,
} = require('./controller');
const { favItemSortingFields } = require('./fav-item.entity');

const router = express.Router({ mergeParams: true });

router
  .route('/') //
  .get(parsePagination, parseSorting(favItemSortingFields), listFavItems)
  .post(createFavItem);

router
  .route('/:id') //
  .get(appendFavItemById, getFavItem)
  .patch(appendFavItemById, editFavItem)
  .delete(appendFavItemById, removeFavItem);

module.exports = router;
