const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");


const Partner = sequelize.define("Partners", {
  PartnerId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
});

module.exports = Partner;
