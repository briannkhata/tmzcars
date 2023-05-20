require("../database/database.js");
const { CarType } = require("../models/cartype.js");

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
      .json({ success: 0, message: `Error getting data : ${err}` });
  }
};

const getSingle = async (req, res) => {
  try {
    const { Id } = req.params;
    const cartype = await CarType.findByPk(Id);
    if (!cartype) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: cartype,
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
    await CarType.create({ CarType: req.body.CarType })
      .then((response) => {
        res.status(200).json({
          success: 1,
          message: "Car Type created Succesfull",
          data: response,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: 0, message: ` error Adding cartype : ${err}` });
      })
      .finally(() => {});
  } catch {}
};

const update = async (req, res) => {
  try {
    const updatecartype = await CarType.update(
      { CarType: req.body.CarType },
      { where: { CarTypeId: req.body.CarTypeId } }
    );
    if (!updatecartype) {
      res.status(500).json({
        success: 0,
        message: ` Error Updating cartype : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "cartype Updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating cartype : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updatecartype = await CarType.update(
      { Deleted: 1 },
      { where: { CarTypeId: Id } }
    );
    if (!updatecartype) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting cartype : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "car type deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting cartype : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
