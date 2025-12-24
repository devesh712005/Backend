const { errorResponse } = require("../utils/responseHandler");

exports.notFound = (req, res, next) => {
  return errorResponse(res, `Route ${req.originalUrl} not found`, 404);
};
