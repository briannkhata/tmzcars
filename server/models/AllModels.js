const { Sequelize } = require("sequelize");
const sequelize = require("../database/database.js");
const { User } = require("./User.js");
const { Car } = require("./Car.js");
const { Attribute } = require("./Attribute.js");
const { Body } = require("./Body.js");
const { CarType } = require("./CarType.js");
const { Condition } = require("./Condition.js");
const { Enquiry } = require("./Enquiry.js");
const { Feature } = require("./Feature.js");
const { FuelType } = require("./FuelType.js");
const { IdType } = require("./IdType.js");
const { Make } = require("./Make.js");
const { Model } = require("./Model.js");
const { Photo } = require("./Photo.js");
const { Transmission } = require("./Transmission.js");
const { Payment } = require("./Payment.js");
const { Setting } = require("./Setting.js");
const { Faq } = require("./Faq.js");
const { Message } = require("./Message.js");
const { Partner } = require("./Partner.js");
const { Plan } = require("./Plan.js");
const { Applicant } = require("./Applicant.js");
const { Testimonial } = require("./Testimonial.js");

//relationships
Model.hasOne(Car, {
  foreignKey: "ModelId",
});
Make.hasOne(Car, {
  foreignKey: "MakeId",
});

Transmission.hasOne(Car, {
  foreignKey: "TransmissionId",
});

User.hasOne(Testimonial, {
  foreignKey: "UserId",
});

Condition.hasOne(Car, {
  foreignKey: "ConditionId",
});

FuelType.hasOne(Car, {
  foreignKey: "FuelTypeId",
});

CarType.hasOne(Car, {
  foreignKey: "CarTypeId",
});

IdType.hasOne(User, {
  foreignKey: "IdTypeId",
});

User.hasMany(Car, {
  foreignKey: "UserId",
});

Car.hasMany(Photo, {
  foreignKey: "CarId",
});

Car.hasMany(Feature, {
  foreignKey: "CarId",
});

Car.hasMany(Attribute, {
  foreignKey: "CarId",
});

Car.hasMany(Payment, {
  foreignKey: "CarId",
});

Car.hasMany(Photo, {
  foreignKey: "CarId",
});

Car.hasMany(Attribute, {
  foreignKey: "CarId",
});

Car.hasMany(Payment, {
  foreignKey: "CarId",
});

Car.hasMany(Enquiry, {
  foreignKey: "CarId",
});

Body.hasOne(Car, {
  foreignKey: "BodyId",
});

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err) => {
    console.error("Unable to synchronize database:", err);
  })
  .finally(() => {
    sequelize.close();
  });
