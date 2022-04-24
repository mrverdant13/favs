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

const router = express.Router();

router
  .route('/') //
  .get(parsePagination, parseSorting(favsListSortingFields), listFavsLists)
  .post(createFavsList);

router
  .route('/:id') //
  .get(appendFavsListById, getFavsList)
  .delete(appendFavsListById, removeFavsList);

router.use(
  '/:listId/items',
  checkParentExistence(FavsList, 'listId'),
  parseFiltering(favItemRelations),
  favItemsRouter,
);

module.exports = router;
