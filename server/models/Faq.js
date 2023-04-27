const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Faq = sequelize.define("Faqs", {
  FaqId: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
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
});

module.exports = Faq;
