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
    CarId: {
      type: DataTypes.BIGINT,
      foreignKey: {
        column: "CarId",
        referencedTable: "Car",
      },
    },
  },
  {
    timestamps: false,
  }
);

Photo.belongsTo(Car, { foreignKey: "CarId" });
Car.hasMany(Photo, { foreignKey: "CarId" });

module.exports = { Photo, sequelize };
