const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Setting = sequelize.define(
  "Settings",
  {
    Id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      defaultValue: 1,
    },
    Phone: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },

    Address: {
      type: DataTypes.STRING,
    },

    App: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Setting, sequelize };
