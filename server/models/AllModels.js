const { Sequelize } = require("sequelize");
const sequelize = require("../database/database.js");
const { User, IdType } = require("./User.js");
const {
  Car,
  Model,
  Make,
  CarType,
  Transmission,
  FuelType,
  Body,
  Condition,
} = require("./Car.js");
const { Enquiry } = require("./Enquiry.js");
const { Feature } = require("./Feature.js");
const { Photo } = require("./Photo.js");
const { Payment } = require("./Payment.js");
const { Setting } = require("./Setting.js");
const { Faq } = require("./Faq.js");
const { Message } = require("./Message.js");
const { Applicant } = require("./Applicant.js");
const { Testimonial } = require("./Testimonial.js");

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err) => {
    console.error("Unable to synchronize database:", err);
  })
  .finally(() => {
    sequelize.close();
  });
