const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Make = sequelize.define(
  "Makes",
  {
    MakeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Make: {
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

module.exports = { Make, sequelize };
