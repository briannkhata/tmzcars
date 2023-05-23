const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Testimonial = sequelize.define(
  "Testimonials",
  {
    TestimonialId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Testimonial: {
      type: DataTypes.STRING,
    },

    Role: {
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

module.exports = { Testimonial, sequelize };
