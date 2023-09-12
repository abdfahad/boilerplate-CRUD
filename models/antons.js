"use strict";

const table = "antons";
module.exports = (sequelize, DataTypes) => {
  const Anton = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    atnNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    profileImage: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  Anton.associate = (models) => {
    // User.hasMany(models.Posts, {
    //   as: "posts",
    //   foreignKey: "fk_user_id",
    //   targetKey: "id",
    // });
  };

  return Anton;
};
