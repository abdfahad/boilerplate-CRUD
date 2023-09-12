const { Users, sequelize } = require("../models");

module.exports = {
  get: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const users = await Users.findAll({ transaction });
      await transaction.commit();
      res.success({ users });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      res.internalError(err);
    }
  },
};
