require("../database/database.js");
const { FuelType } = require("../models/fueltype.js");

const getAll = async (req, res) => {
  try {
    const fueltypes = await FuelType.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: fueltypes,
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
    const fueltype = await FuelType.findByPk(Id);
    if (!fueltype) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: fueltype,
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
    await FuelType.create({ FuelType: req.body.FuelType })
      .then((response) => {
        res.status(200).json({
          success: 1,
          message: "fuel Type created Succesfull",
          data: response,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: 0, message: ` error Adding fueltype : ${err}` });
      })
      .finally(() => {});
  } catch {}
};

const update = async (req, res) => {
  try {
    const updatefueltype = await FuelType.update(
      { FuelType: req.body.FuelType },
      { where: { FuelTypeId: req.body.FuelTypeId } }
    );
    if (!updatefueltype) {
      res.status(500).json({
        success: 0,
        message: ` Error Updating fueltype : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "fueltype Updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating fueltype : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updatefueltype = await FuelType.update(
      { Deleted: 1 },
      { where: { FuelTypeId: Id } }
    );
    if (!updatefueltype) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting fueltype : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "fuel type deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting fueltype : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
