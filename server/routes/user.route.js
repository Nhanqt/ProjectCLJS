const express = require("express");

const userService = require("../services/user.service");
const authService = require("../services/auth.service");
const userMiddleware = require("../middlewares/user");
const authMiddleware = require("../middlewares/auth");

const Router = express.Router();

Router.get("/getAllUser", userService.getAllUsers);

Router.post(
  "/login",
  userMiddleware.checkUserNameExist,
  userMiddleware.checkPassWordMatched,
  authService.login
);

// Router.get("/logout", authService.logout);

Router.post("/", userMiddleware.checkUserNameDuplicate, userService.signUp);

// Router.get(
//   "/danhsach",
//   authMiddleware.authenticateToken,
//   authMiddleware.authenticateRole,
//   userService.getAllUsers
// );

// Router.get("/me", authMiddleware.authenticateToken, userService.getMe);

// Router.post(
//   "/userstatus",
//   authMiddleware.authenticateToken,
//   userService.updateUserStatus
// );

// Router.post(
//   "/update",
//   authMiddleware.authenticateToken,
//   userService.updateUser
// );

// Router.post(
//   "/update-password",
//   authMiddleware.authenticateToken,
//   userService.updatePassword
// );

module.exports = Router;
