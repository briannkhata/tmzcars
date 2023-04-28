const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Body = sequelize.define("Bodys", {
  BodyId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  Body: {
    type: DataTypes.STRING,
  },
  Deleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Body;
