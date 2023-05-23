const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Faq = sequelize.define(
  "Faqs",
  {
    FaqId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Faq: {
      type: DataTypes.STRING,
    },
    Answer: {
      type: DataTypes.TEXT,
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

module.exports = { Faq, sequelize };
