const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Interior = sequelize.define(
  "Interiors",
  {
    InteriorId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Interior: {
      type: DataTypes.STRING,
    },
    Deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Interior;
