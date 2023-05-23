const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Partner = sequelize.define(
  "Partners",
  {
    PartnerId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Partner: {
      type: DataTypes.STRING,
    },
    Logo: {
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

module.exports = { Partner, sequelize };
