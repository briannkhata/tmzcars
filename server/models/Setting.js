const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Setting = sequelize.define("Settings", {
  Id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
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
});

module.exports = Setting;
