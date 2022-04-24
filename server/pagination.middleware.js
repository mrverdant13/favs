const defaultLimit = 10;
const maxLimit = 100;

exports.parsePagination = (req, _, next) => {
  const { limit: limitStr = defaultLimit, offset: offsetStr = 0 } = req.query;
  const limit = parseInt(limitStr, 10);
  const offset = parseInt(offsetStr, 10);
  const limitIsValid = !Number.isNaN(limit) && limit > 0;
  const offsetIsValid = !Number.isNaN(offset) && offset >= 0;
  if (!limitIsValid || !offsetIsValid) {
    next({
      statusCode: 400,
      message:
        'Bad request: invalid pagination params.' +
        `${limitIsValid ? '' : ' `limit` must be a positive integer.'}` +
        `${offsetIsValid ? '' : ' `offset` must be a positive integer.'}`,
    });
  }
  req.limit = Math.min(limit, maxLimit);
  req.offset = offset;
  next();
};
