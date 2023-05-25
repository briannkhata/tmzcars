const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");
const { User } = require("../models/User.js");

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

Testimonial.belongsTo(User, { foreignKey: "UserId" });
User.hasMany(Testimonial, { foreignKey: "UserId" });
module.exports = { Testimonial, sequelize };
