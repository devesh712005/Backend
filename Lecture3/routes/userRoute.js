const express = require("express");
const {
  createUser,
  findUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const route = express.Router();

route.post("/create-user", createUser);
route.get("/find-user/:id", findUser);
route.delete("/delete-user/:id", deleteUser);
route.put("/update-user/:id", updateUser);
module.exports = route;
