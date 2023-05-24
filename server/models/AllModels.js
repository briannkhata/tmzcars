const { Sequelize } = require("sequelize");
const sequelize = require("../database/database.js");
const { User, IdType, Testimonial } = require("./User.js");
const {
  Car,
  Use,
  Model,
  Make,
  CarType,
  Transmission,
  FuelType,
  Body,
  Condition,
  Payment,
} = require("./Car.js");
// const { Attribute } = require("./Attribute.js");
// const { Body } = require("./Body.js");
// const { CarType } = require("./CarType.js");
// const { Condition } = require("./Condition.js");
// const { Enquiry } = require("./Enquiry.js");
// const { Feature } = require("./Feature.js");
// const { FuelType } = require("./FuelType.js");
// const { IdType } = require("./IdType.js");
// const { Make } = require("./Make.js");
// const { Model } = require("./Model.js");
// const { Photo } = require("./Photo.js");
// const { Transmission } = require("./Transmission.js");
// const { Payment } = require("./Payment.js");
const { Setting } = require("./Setting.js");
const { Faq } = require("./Faq.js");
const { Message } = require("./Message.js");
const { Partner } = require("./Partner.js");
const { Plan } = require("./Plan.js");
const { Applicant } = require("./Applicant.js");
// const { Testimonial } = require("./Testimonial.js");

// Model.hasMany(Car, {
//   foreignKey: "ModelId",
// });
// Car.belongsTo(Model, {
//   foreignKey: "ModelId",
// });

// Make.hasMany(Car, {
//   foreignKey: "MakeId",
// });
// Car.belongsTo(Make, {
//   foreignKey: "MakeId",
// });

// Transmission.hasMany(Car, {
//   foreignKey: "TransmissionId",
// });
// Car.belongsTo(Transmission, {
//   foreignKey: "TransmissionId",
// });

// User.hasOne(Testimonial, {
//   foreignKey: "UserId",
// });
// Testimonial.belongsTo(User, {
//   foreignKey: "UserId",
// });

// Condition.hasMany(Car, {
//   foreignKey: "ConditionId",
// });
// Car.belongsTo(Condition, {
//   foreignKey: "ConditionId",
// });

// FuelType.hasMany(Car, {
//   foreignKey: "FuelTypeId",
// });
// Car.belongsTo(FuelType, {
//   foreignKey: "FuelTypeId",
//   onUpdate: "CASCADE",
// });

// CarType.hasMany(Car, {
//   foreignKey: "CarTypeId",
// });
// Car.belongsTo(CarType, {
//   foreignKey: "CarTypeId",
// });

// User.hasMany(Car, {
//   foreignKey: "UserId",
// });
// Car.belongsTo(User, {
//   foreignKey: "UserId",
// });

// Car.hasMany(Photo, {
//   foreignKey: "CarId",
// });
// Photo.belongsTo(Car, {
//   foreignKey: "CarId",
// });

// Car.hasMany(Feature, {
//   foreignKey: "CarId",
// });
// Feature.belongsTo(Car, {
//   foreignKey: "CarId",
// });

// Car.hasMany(Attribute, {
//   foreignKey: "CarId",
// });
// Attribute.belongsTo(Car, {
//   foreignKey: "CarId",
// });

// Car.hasMany(Payment, {
//   foreignKey: "CarId",
// });

// Payment.belongsTo(Car, {
//   foreignKey: "CarId",
// });

// Car.hasMany(Enquiry, {
//   foreignKey: "CarId",
// });
// Enquiry.belongsTo(Car, {
//   foreignKey: "CarId",
// });

// Body.hasMany(Car, {
//   foreignKey: "BodyId",
// });
// Car.belongsTo(Body, {
//   foreignKey: "BodyId",
// });

// Car.associate = (models) => {
//   Car.belongsTo(models.Model);
// };
// Car.associate = (models) => {
//   Car.belongsTo(models.Make);
// };
// Car.associate = (models) => {
//   Car.belongsTo(models.FuelType);
// };
// Car.associate = (models) => {
//   Car.belongsTo(models.Condition);
// };
// Car.associate = (models) => {
//   Car.belongsTo(models.Transmission);
// };
// Car.associate = (models) => {
//   Car.belongsTo(models.CarType);
// };
// Car.associate = (models) => {
//   Car.belongsTo(models.Body);
// };

// Photo.associate = (models) => {
//   Photo.hasMany(models.Car);
// };

// Body.associate = (models) => {
//   Body.hasMany(models.Car);
// };
// CarType.associate = (models) => {
//   CarType.hasMany(models.Car);
// };
// Condition.associate = (models) => {
//   Condition.hasMany(models.Car);
// };
// Enquiry.associate = (models) => {
//   Enquiry.hasMany(models.Car);
// };

// Feature.associate = (models) => {
//   Feature.hasMany(models.Car);
// };

// FuelType.associate = (models) => {
//   FuelType.hasMany(models.Car);
// };
// IdType.associate = (models) => {
//   IdType.hasMany(models.User);
// };
// Make.associate = (models) => {
//   Make.hasMany(models.Car);
// };
// Model.associate = (models) => {
//   Model.hasMany(models.Car);
// };
// Transmission.associate = (models) => {
//   Transmission.hasMany(models.Car);
// };
// Testimonial.associate = (models) => {
//   Testimonial.hasMany(models.User);
// };

// User.associate = (models) => {
//   User.belongsTo(models.IdType);
// };
// User.associate = (models) => {
//   User.belongsTo(models.Testimonial);
// };
// Photo.associate = (models) => {
//   Photo.belongsTo(models.Car);
// };
// Feature.associate = (models) => {
//   Feature.hasMany(models.Car);
// };

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
