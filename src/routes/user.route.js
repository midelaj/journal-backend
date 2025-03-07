const express = require("express");

const route = express.Router();
const {
  register,
  updateUser,
  getUser,
  loginUser,
  deleteUser,
} = require("../controllers/user.controller");

route.post("/register", register);
route.post("/login", loginUser);
route.get("/:id", getUser);
route.put("/:id", updateUser);
route.delete("/:id", deleteUser);

module.exports = route;
