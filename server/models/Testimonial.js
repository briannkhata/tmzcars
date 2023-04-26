const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

const Testimonial = sequelize.define("Testimonials", {
  TestimonialId: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
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
});

module.exports = Testimonial;
