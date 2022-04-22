const FavsList = require('./favs-list.entity');

// Middlewares

/**
 * Finds a favs list by the `id` path param and appends it to `req` object as `favsList`.
 *
 * If no favs list is found, returns the `404` HTTP code.
 */
exports.appendFavsListById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: 'Missing `id` path param.' });
    const favsListDoc = await FavsList.findById(id);
    if (!favsListDoc) res.status(404).json({ message: 'Favs list not found' });
    req.favsList = favsListDoc;
    next();
  } catch (err) {
    next(err);
  }
};

// Request handlers

exports.createFavsList = async (req, res, next) => {
  try {
    const { body } = req;
    const favsListModel = new FavsList(body);
    const createdFavsListDoc = await favsListModel.save();
    res.status(201).json(createdFavsListDoc);
  } catch (err) {
    next(err);
  }
};

exports.listFavsLists = async (req, res, next) => {
  try {
    const { limit, offset } = req;
    const favsListDocs = await FavsList.find().skip(offset).limit(limit);
    res.status(200).json(favsListDocs);
  } catch (err) {
    next(err);
  }
};

exports.getFavsList = async (req, res) => {
  const favsListDoc = req.favsList;
  res.status(200).json(favsListDoc);
};

exports.removeFavsList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedFavsList = await FavsList.findByIdAndRemove(id);
    res.status(200).json(removedFavsList);
  } catch (err) {
    next(err);
  }
};
