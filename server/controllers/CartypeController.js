const { CarType } = require("../models/CarType.js");

const getAll = async (req, res) => {
  try {
    const cartypes = await CarType.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: cartypes,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error getting car types : ${err}` });
  }
};

const getSingle = async (req, res) => {
  try {
    const { Id } = req.params;
    const carType = await CarType.findByPk(Id);
    if (!carType) {
      res
        .status(500)
        .json({ success: 0, message: ` Car Type Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Car Type succesfull",
      data: carType,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Car Type : ${err}`,
    });
  }
};

const add = async (req, res) => {
  try {
    const carType = req.body.Cartype;
    await CarType.create({ CarType: carType });
    res.status(200).json({
      success: 1,
      message: "Car Type Created",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error creating Car Type : ${err}` });
  }
};

const update = async (req, res) => {
  try {
    const cartype = req.body.CarType;
    const id = req.body.CartypeId;
    const updateCarType = await CarType.update(
      { CarType: cartype },
      { where: { CartypeId: id } }
    );
    if (!updateCarType) {
      res.status(500).json({
        success: 0,
        message: ` Error updating Car Type : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Car Type updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating Car Type : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updateCarType = await CarType.update(
      { Deleted: 1 },
      { where: { CartypeId: Id } }
    );
    if (!updateCarType) {
      res
        .status(500)
        .json({ success: 0, message: ` Error deleting Car Type : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Car Type deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Car Type : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
