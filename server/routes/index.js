const express = require("express");

const userRoute = require("../routes/user.route");
const Router = express.Router();

Router.use("/users", userRoute);

module.exports = Router;
