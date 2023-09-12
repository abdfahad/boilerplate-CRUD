"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("antons", "email", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    });
    await queryInterface.changeColumn("antons", "atnNumber", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("antons", "email", {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    });
    await queryInterface.changeColumn("antons", "atnNumber", {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    });
  },
};
