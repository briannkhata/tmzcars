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
  onUpdate: "CASCADE",
});
Car.belongsTo(Model, {
  foreignKey: "ModelId",
  onUpdate: "CASCADE",
});

Make.hasOne(Car, {
  foreignKey: "MakeId",
  onUpdate: "CASCADE",
});
Car.belongsTo(Make, {
  foreignKey: "MakeId",
  onUpdate: "CASCADE",
});

Transmission.hasOne(Car, {
  foreignKey: "TransmissionId",
  onUpdate: "CASCADE",
});
Car.belongsTo(Transmission, {
  foreignKey: "TransmissionId",
  onUpdate: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasOne(Testimonial, {
  foreignKey: "UserId",
  onUpdate: "CASCADE",
});
Testimonial.belongsTo(User, {
  foreignKey: "UserId",
  onUpdate: "CASCADE",
});

Condition.hasOne(Car, {
  foreignKey: "ConditionId",
  onUpdate: "CASCADE",
});
Car.belongsTo(Condition, {
  foreignKey: "ConditionId",
  onUpdate: "CASCADE",
});

FuelType.hasOne(Car, {
  foreignKey: "FuelTypeId",
  onUpdate: "CASCADE",
});
Car.belongsTo(FuelType, {
  foreignKey: "FuelTypeId",
  onUpdate: "CASCADE",
});

CarType.hasOne(Car, {
  foreignKey: "CarTypeId",
  onUpdate: "CASCADE",
});
Car.belongsTo(CarType, {
  foreignKey: "CarTypeId",
  onUpdate: "CASCADE",
});

IdType.hasOne(User, {
  foreignKey: "IdTypeId",
  onUpdate: "CASCADE",
});
User.belongsTo(IdType, {
  foreignKey: "IdTypeId",
  onUpdate: "CASCADE",
});

User.hasMany(Car, {
  foreignKey: "UserId",
  onUpdate: "CASCADE",
});
Car.belongsTo(User, {
  foreignKey: "UserId",
  onUpdate: "CASCADE",
});

Car.hasMany(Photo, {
  foreignKey: "CarId",
  onUpdate: "CASCADE",
});
Photo.belongsTo(Car, {
  foreignKey: "CarId",
  onUpdate: "CASCADE",
});

Car.hasMany(Feature, {
  foreignKey: "CarId",
  onUpdate: "CASCADE",
});
Feature.belongsTo(Car, {
  foreignKey: "CarId",
  onUpdate: "CASCADE",
});

Car.hasMany(Attribute, {
  foreignKey: "CarId",
  onUpdate: "CASCADE",
});
Attribute.belongsTo(Car, {
  foreignKey: "CarId",
  onUpdate: "CASCADE",
});

Car.hasMany(Payment, {
  foreignKey: "CarId",
  onUpdate: "CASCADE",
});

Payment.belongsTo(Car, {
  foreignKey: "CarId",
  onUpdate: "CASCADE",
});

Car.hasMany(Enquiry, {
  foreignKey: "CarId",
  onUpdate: "CASCADE",
});
Enquiry.belongsTo(Car, {
  foreignKey: "CarId",
  onUpdate: "CASCADE",
});

Body.hasOne(Car, {
  foreignKey: "BodyId",
  onUpdate: "CASCADE",
});
Car.belongsTo(Body, {
  foreignKey: "BodyId",
  onUpdate: "CASCADE",
});

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
