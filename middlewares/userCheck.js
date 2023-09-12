const { Antons } = require("../models");

module.exports = {
  checkUserExistence: async (req, res, next) => {
    Antons.findOne({ where: { atnNumber: req.params.atn } })
      .then((anton) => {
        if (anton) {
          next();
        } else {
          res.internalError(new Error("User does not exist"));
        }
      })
      .catch((err) => {
        console.log(err);
        res.internalError(err);
      });
  },
};
