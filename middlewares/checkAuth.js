const jwt = require("jsonwebtoken");
const { isEmpty, isNil, isNull } = require("lodash");
const config = require("../config");
const { Users, Roles, sequelize } = require("../models");

module.exports = {
  user: async (req, res, next) => {
    try {
      const { userId } = req.params;

      if (isNil(req.header("Authorization"))) {
        throw { status: 400, message: "Authorization Header is required" };
      }

      let tokenString = req.header("Authorization");

      if (isEmpty(tokenString)) {
        throw { status: 400, message: "Token string is Empty" };
      }

      tokenString = tokenString.split(" ");

      if (tokenString.length < 2) {
        throw { status: 400, message: "Token string is Empty" };
      }

      const token = tokenString[1];

      if (isEmpty(token)) {
        throw { status: 400, message: "Token is Empty" };
      }

      const user = await Users.findOne({
        where: { id: userId },
      });

      if (isNull(user)) {
        throw { status: 404, message: "User doesn't exist" };
      }

      const secretKey = config.get(`jwt.user_secret_key`);

      const decoded = jwt.verify(token, secretKey);

      if (user.id !== decoded.user.id) {
        throw { status: 401, message: "Token and user id not matched" };
      }

      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },
};
