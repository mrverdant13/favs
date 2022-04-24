const { FavItem } = require('./fav-item.entity');

// Middlewares

/**
 * Finds a fav item by the `id` path param and appends it to `req` object as `favItem`.
 *
 * If no fav item is found, returns the `404` HTTP code.
 */
exports.appendFavItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: 'Missing `id` path param.' });
    const favItemDoc = await FavItem.findById(id);
    if (!favItemDoc) res.status(404).json({ message: 'Fav item not found' });
    req.favItem = favItemDoc;
    next();
  } catch (err) {
    next(err);
  }
};

// Request handlers

exports.createFavItem = async (req, res, next) => {
  try {
    const { body } = req;
    const favItemModel = new FavItem(body);
    const createdFavItemDoc = await favItemModel.save();
    res.status(201).json(createdFavItemDoc);
  } catch (err) {
    next(err);
  }
};

exports.listFavItems = async (req, res, next) => {
  try {
    const { limit, offset, sortBy, direction, filterBy } = req;
    const [favItemsDocs, totalFavItems] = await Promise.all([
      FavItem.find(filterBy)
        .sort({ [sortBy]: direction })
        .skip(offset)
        .limit(limit),
      FavItem.countDocuments(),
    ]);
    res.status(200).json({ total: totalFavItems, favItems: favItemsDocs });
  } catch (err) {
    next(err);
  }
};

exports.getFavItem = async (req, res) => {
  const favItemDoc = req.favItem;
  res.status(200).json(favItemDoc);
};

exports.editFavItem = async (req, res, next) => {
  try {
    const { favItem: favItemDoc, body: newFavItem } = req;
    Object.assign(favItemDoc, newFavItem);
    const updatedFavItemDoc = await favItemDoc.save();
    res.status(200).json(updatedFavItemDoc);
  } catch (err) {
    next(err);
  }
};

exports.removeFavItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedFavItem = await FavItem.findByIdAndRemove(id);
    res.status(200).json(removedFavItem);
  } catch (err) {
    next(err);
  }
};
