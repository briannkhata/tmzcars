const { DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Body = sequelize.define(
  "Bodies",
  {
    BodyId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Body: {
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

Body.associate = (models) => {
  Body.hasMany(models.Car);
};
module.exports = { Body, sequelize };
