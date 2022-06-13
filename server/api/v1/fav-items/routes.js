const express = require('express');
const { parsePagination } = require('../../../pagination.middleware');
const { parseSorting } = require('../../../sorting.middleware');
const { me } = require('../users/auth.middleware');
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
  .get(me, parsePagination, parseSorting(favItemSortingFields), listFavItems)
  .post(me, createFavItem);

router
  .route('/:id') //
  .get(me, appendFavItemById, getFavItem)
  .patch(me, appendFavItemById, editFavItem)
  .delete(me, appendFavItemById, removeFavItem);

module.exports = router;
