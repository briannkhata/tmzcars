const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Model = sequelize.define("Models", {
  ModelId: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  Model: {
    type: DataTypes.STRING,
  },
  Deleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Model;
