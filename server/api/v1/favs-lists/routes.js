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
const favItemsRouter = require('../fav-items/routes');
const { favsListSortingFields, FavsList } = require('./favs-list.entity');
const { parseFiltering } = require('../../../filtering.middleware');
const { favItemRelations } = require('../fav-items/fav-item.entity');
const { checkParentExistence } = require('../../../parent-checker.middleware');
const { me } = require('../users/auth.middleware');

const router = express.Router();

router
  .route('/') //
  .get(me, parsePagination, parseSorting(favsListSortingFields), listFavsLists)
  .post(me, createFavsList);

router
  .route('/:id') //
  .get(me, appendFavsListById, getFavsList)
  .delete(me, appendFavsListById, removeFavsList);

router.use(
  '/:listId/items',
  me,
  checkParentExistence(FavsList, 'listId'),
  parseFiltering(favItemRelations),
  favItemsRouter,
);

module.exports = router;
