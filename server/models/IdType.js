const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const IdType = sequelize.define(
  "IdTypes",
  {
    IdTypeId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    IdType: {
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

IdType.associate = (models) => {
  IdType.hasMany(models.Car);
};

module.exports = { IdType, sequelize };
