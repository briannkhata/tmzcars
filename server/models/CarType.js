const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const CarType = sequelize.define(
  "CarType",
  {
    CarTypeId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    CarType: {
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

CarType.associate = (models) => {
  CarType.hasMany(models.Car);
};

module.exports = { CarType, sequelize };
