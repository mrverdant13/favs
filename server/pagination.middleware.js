const defaultLimit = 10;
const maxLimit = 100;

exports.parsePagination = (req, _, next) => {
  const { limit: limitString, offset: offsetString } = req.query;
  const limit = parseInt(limitString, 10) || defaultLimit;
  const offset = parseInt(offsetString, 10) || 0;
  req.limit = Math.min(limit, maxLimit);
  req.offset = offset;
  next();
};
