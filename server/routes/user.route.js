const express = require("express");

const userService = require("../services/user.service");
const authService = require("../services/auth.service");
const userMiddleware = require("../middlewares/user");
const authMiddleware = require("../middlewares/auth");

const Router = express.Router();

Router.post(
  "/login",
  userMiddleware.checkUserNameExist,
  userMiddleware.checkPassWordMatched,
  authService.login
);

Router.get("/logout", authService.logout);

Router.post("/", userMiddleware.checkUserNameDuplicate, userService.signUp);

Router.get(
  "/danhsach",
  authMiddleware.authenticateToken,
  authMiddleware.authenticateRole,
  userService.getAllUsers
);

Router.get("/me", authMiddleware.authenticateToken, userService.getMe);

Router.post(
  "/userstatus",
  authMiddleware.authenticateToken,
  userService.updateUserStatus
);

Router.post(
  "/update",
  authMiddleware.authenticateToken,
  userService.updateUser
);

Router.post(
  "/update-password",
  authMiddleware.authenticateToken,
  userService.updatePassword
);

/**
 * @swagger
 * definitions:
 *  Auth:
 *   type: object
 *   properties:
 *    userName:
 *     type: string
 *     description: email of user
 *     example: 'member@gmail.com'
 *    password:
 *     type: string
 *     description: password of user
 *     example: '12345678'
 */

/**
 * @swagger
 * definitions:
 *  Status:
 *   type: object
 *   properties:
 *    id:
 *     type: uuid
 *     description: id of user
 *     example: "615a53139769e3c67f21bdad"
 *    status:
 *     type: boolean
 *     description: status of user
 *     example: true
 */

/**
 * @swagger
 * definitions:
 *  User:
 *   type: object
 *   properties:
 *    userName:
 *     type: string
 *     description: email of user
 *     example: 'member@gmail.com'
 *    password:
 *     type: string
 *     description: password of user
 *     example: '12345678'
 *    fullName:
 *     type: string
 *     description: full name of the user
 *     example: 'Nguyen Jackson'
 *    age:
 *     type: string
 *     description: age of the user
 *     example: '18'
 *    phone:
 *     type: string
 *     description: phone of the user
 *     example: '112'
 */

/**
 * @swagger
 * /api/users/login:
 *  post:
 *   summary: login to app
 *   description: login to app
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/Auth'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Auth'
 *   responses:
 *    200:
 *     description: token
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/users/logout:
 *  get:
 *   summary: clear cookie token
 *   description: clear cookie token
 *   responses:
 *    200:
 *     description: token
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *   summary: Create user
 *   description: Create user
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/User'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/User'
 *   responses:
 *    200:
 *     description: token
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/users/danhsach:
 *  get:
 *   summary: get list users
 *   description: get list users
 *   responses:
 *    200:
 *     description: list user after login
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/users/me:
 *  get:
 *   summary: get info after login
 *   description: get info after login
 *   responses:
 *    200:
 *     description: info user
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/users/me:
 *  get:
 *   summary: get info after login
 *   description: get info after login
 *   responses:
 *    200:
 *     description: info user
 *    500:
 *     description: error servers
 */

/**
 * @swagger
 * /api/users/userstatus:
 *  post:
 *   summary: Update status user
 *   description: Update status user
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: login to app
 *      schema:
 *       $ref: '#/definitions/Status'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Status'
 *   responses:
 *    200:
 *     description: update status user
 *    500:
 *     description: error servers
 */

module.exports = Router;
