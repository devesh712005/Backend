const { errorResponse } = require("../utils/responseHandler");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return errorResponse(
      res,
      "User not authorized please provide a valid token",
      401
    );
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    console.log(req.user);
    next();
  } catch (error) {
    return errorResponse(res, "Invalid or expired token ", 401);
  }
};

module.exports = authMiddleware;
