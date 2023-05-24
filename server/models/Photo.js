const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Photo = sequelize.define(
  "Photos",
  {
    PhotoId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
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

Photo.associate = (models) => {
  Photo.hasMany(models.Car);
};

module.exports = { Photo, sequelize };
