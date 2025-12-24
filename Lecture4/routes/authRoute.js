const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  checkAuth,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

//protected route

router.get("/me", authMiddleware, checkAuth);

module.exports = router;
