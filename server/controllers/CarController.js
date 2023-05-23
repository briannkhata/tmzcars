const { Car } = require("../models/Car.js");
const { CarType } = require("../models/CarType.js");
const { Make } = require("../models/Make.js");
const { Model } = require("../models/Model.js");
const { Transmission } = require("../models/Transmission.js");
const { FuelType } = require("../models/FuelType.js");
const { Body } = require("../models/Body.js");
const { Condition } = require("../models/Condition.js");
const getAll = async (req, res) => {
  try {
    const cars = await Car.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Cars Retrieved successfully",
      data: cars,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error getting cars : ${err}` });
  }
};
const getOne = async (req, res) => {
  try {
    const { Id } = req.params;
    const car = await Car.findByPk(Id);
    if (!car) {
      res.status(500).json({ success: 0, message: ` Car Not found ` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Car succesfull",
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Car : ${err}`,
    });
  }
};

const getCarsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.CategoryId;
    const car = await Car.findAll({ where: { CategoryId: categoryId } });
    if (!car) {
      res.status(500).json({ success: 0, message: ` Cars Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Cars succesfull",
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Cars : ${err}`,
    });
  }
};

const getCarsByModel = async (req, res) => {
  try {
    const modelId = req.params.ModelId;
    const car = await Car.findAll({ where: { ModelId: modelId } });
    if (!car) {
      res.status(500).json({ success: 0, message: ` Cars Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Cars succesfull",
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Cars : ${err}`,
    });
  }
};

const getCarsByMake = async (req, res) => {
  try {
    const makeId = req.params.MakeId;
    const car = await Car.findAll({ where: { MakeId: makeId } });
    if (!car) {
      res.status(500).json({ success: 0, message: ` Cars Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Cars succesfull",
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Cars : ${err}`,
    });
  }
};
const getCarsByCartype = async (req, res) => {
  try {
    const cartypeId = req.params.CartypeId;
    const car = await Car.findAll({ where: { CartypeId: cartypeId } });
    if (!car) {
      res.status(500).json({ success: 0, message: ` Cars Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Cars succesfull",
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Cars : ${err}`,
    });
  }
};

const getCarsByBody = async (req, res) => {
  try {
    const bodyId = req.params.BodyId;
    const car = await Car.findAll({ where: { BodyId: bodyId } });
    if (!car) {
      res.status(500).json({ success: 0, message: ` Cars Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Cars succesfull",
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Cars : ${err}`,
    });
  }
};

const getCarsByCondition = async (req, res) => {
  try {
    const conditionId = req.params.ConditionId;
    const car = await Car.findAll({ where: { ConditionId: conditionId } });
    if (!car) {
      res.status(500).json({ success: 0, message: ` Cars Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Cars succesfull",
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Cars : ${err}`,
    });
  }
};

const getCarsByTransmission = async (req, res) => {
  try {
    const transmissionId = req.params.TransmissionId;
    const car = await Car.findAll({
      where: { TransmissionId: transmissionId },
    });
    if (!car) {
      res.status(500).json({ success: 0, message: ` Cars Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Cars succesfull",
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Cars : ${err}`,
    });
  }
};

const getCarsByInterior = async (req, res) => {
  try {
    const interiorId = req.params.InteriorId;
    const car = await Car.findAll({
      where: { InteriorId: interiorId },
    });
    if (!car) {
      res.status(500).json({ success: 0, message: ` Cars Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Cars succesfull",
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Cars : ${err}`,
    });
  }
};

const getCarsByExterior = async (req, res) => {
  try {
    const exteriorId = req.params.ExteriorId;
    const car = await Car.findAll({
      where: { ExteriorId: exteriorId },
    });
    if (!car) {
      res.status(500).json({ success: 0, message: ` Cars Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Cars succesfull",
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Cars : ${err}`,
    });
  }
};

const getCarsByFueltype = async (req, res) => {
  try {
    const fueltypeId = req.params.FuelTypeId;
    const car = await Car.findAll({
      where: { FuelTypeId: fueltypeId },
    });
    if (!car) {
      res.status(500).json({ success: 0, message: ` Cars Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Cars succesfull",
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Cars : ${err}`,
    });
  }
};

const getCarsBySteering = async (req, res) => {
  try {
    const steeringId = req.params.SteeringId;
    const car = await Car.findAll({
      where: { SteeringId: steeringId },
    });
    if (!car) {
      res.status(500).json({ success: 0, message: ` Cars Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Cars succesfull",
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Cars : ${err}`,
    });
  }
};

const add = async (req, res) => {
  try {
    const {
      Year,
      SellingPrice,
      Mileage,
      Engine,
      FuelConsumption,
      Warrant,
      CountryOfManufacture,
      ServiceHistory,
      RegNo,
      ModelId,
      MakeId,
      TransmissionId,
      Steering,
      ConditionId,
      InteriorColor,
      ExteriorColor,
      FuelTypeId,
      CarTypeId,
      UserId,
      BodyId,
      YearBought,
      YearsUsed,
      OtherDetails,
    } = req.body;
    await Car.create({
      Year,
      SellingPrice,
      Mileage,
      Engine,
      FuelConsumption,
      Warrant,
      CountryOfManufacture,
      ServiceHistory,
      RegNo,
      ModelId,
      MakeId,
      TransmissionId,
      Steering,
      ConditionId,
      InteriorColor,
      ExteriorColor,
      FuelTypeId,
      CarTypeId: req.body.CarTypeId,
      UserId,
      BodyId,
      YearBought,
      YearsUsed,
      OtherDetails,
    });
    res.status(200).json({
      success: 1,
      message: "Car saved successfully",
    });
  } catch (err) {
    res.status(500).json({ success: 0, message: `Error adding Car : ${err}` });
  }
};

const update = async (req, res) => {
  try {
    const {
      Year,
      SellingPrice,
      Mileage,
      Engine,
      FuelConsumption,
      Warrant,
      CountryOfManufacture,
      ServiceHistory,
      RegNo,
      ModelId,
      MakeId,
      TransmissionId,
      Steering,
      ConditionId,
      InteriorColor,
      ExteriorColor,
      FuelTypeId,
      CarTypeId,
      UserId,
      BodyId,
      YearBought,
      YearsUsed,
      OtherDetails,
    } = req.body;
    const { Id } = req.body.CarId;
    const updateCar = await Car.update(
      {
        Year,
        SellingPrice,
        Mileage,
        Engine,
        FuelConsumption,
        Warrant,
        CountryOfManufacture,
        ServiceHistory,
        RegNo,
        ModelId,
        MakeId,
        TransmissionId,
        Steering,
        ConditionId,
        InteriorColor,
        ExteriorColor,
        FuelTypeId,
        CarTypeId,
        UserId,
        BodyId,
        YearBought,
        YearsUsed,
        OtherDetails,
      },
      { where: { CarId: Id } }
    );
    if (!updateCar) {
      res
        .status(500)
        .json({ success: 0, message: ` Error deleting Car : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Car deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Car : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updateCar = await Car.update(
      { Deleted: 1 },
      { where: { CarId: Id } }
    );
    if (!updateCar) {
      res
        .status(500)
        .json({ success: 0, message: ` Error deleting Car : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Car deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Car : ${err}` });
  }
};

const searchCar = (req, res) => {
  res.send("search car");
};

module.exports = {
  getAll,
  getOne,
  remove,
  update,
  searchCar,
  getCarsByCategory,
  getCarsByBody,
  getCarsByCartype,
  getCarsByCondition,
  getCarsByExterior,
  getCarsByFueltype,
  getCarsByInterior,
  getCarsByModel,
  getCarsBySteering,
  getCarsByTransmission,
  getCarsByMake,
  add,
};
