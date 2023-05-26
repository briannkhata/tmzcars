require("../database/database.js");
const { Feature } = require("../models/Feature.js");
const { Car } = require("../models/Car.js");

const getAll = async (req, res) => {
  try {
    const features = await Feature.findAll({
      where: {
        Deleted: 0,
      },
      include: [
        {
          model: Car,
        },
      ],
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: features,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error getting data : ${err}` });
  }
};

const getSingle = async (req, res) => {
  try {
    const { Id } = req.params;
    const feature = await Feature.findByPk(Id);
    if (!feature) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: feature,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting data : ${err}`,
    });
  }
};

const add = async (req, res) => {
  try {
    const startDate = req.body.StartDate;
    const endDate = req.body.EndDate;
    const carId = req.body.CarId;
    await Feature.create({
      StartDate: startDate,
      EndDate: endDate,
      CarId: carId,
    });
    res.status(200).json({
      success: 1,
      message: "car featured successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error creating data : ${err}` });
  }
};

const update = async (req, res) => {
  try {
    const addBy = req.body.AddBy;
    const transId = req.body.TransId;
    const carId = req.body.CarId;
    const { Id } = req.params;
    const updatefeature = await Feature.update(
      { TransId: transId, AddBy: addBy, CarId: carId },
      { where: { FeatureId: Id } }
    );
    if (!updatefeature) {
      res.status(500).json({
        success: 0,
        message: ` Error updating : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: 0, message: ` Error updating : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updatefeature = await Feature.update(
      { Deleted: 1 },
      { where: { FeatureId: Id } }
    );
    if (!updatefeature) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: 0, message: ` Error deleting : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
