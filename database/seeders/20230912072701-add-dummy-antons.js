"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("antons", [
      {
        full_name: "John Doe",
        dateOfBirth: "17/12/2000",
        email: "johndoe@example.com",
        atnNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "David Mitchell",
        dateOfBirth: "13/04/1998",
        email: "dm@example.com",
        atnNumber: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "Lee Mack",
        dateOfBirth: "11/11/2000",
        email: "lmack@example.com",
        atnNumber: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
