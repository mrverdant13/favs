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
