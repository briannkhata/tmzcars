const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Testimonial = sequelize.define(
  "Testimonials",
  {
    TestimonialId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Testimonial: {
      type: DataTypes.STRING,
    },
    User: {
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

module.exports = Testimonial;
