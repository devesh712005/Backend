const jwt = require("jsonwebtoken");

const generateToken = (userId, email) => {
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  return jwt.sign({ id: userId, email: email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
module.exports = generateToken;
