const { errorResponse } = require("../utils/responseHandler");

module.exports = (err, req, res, next) => {
  console.error("Error", err.message);
  return errorResponse(res, "Internal server error", err.message, 500);
};
