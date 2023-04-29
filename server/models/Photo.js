const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Photo = sequelize.define(
  "Photos",
  {
    PhotoId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Photo: {
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

module.exports = Photo;
