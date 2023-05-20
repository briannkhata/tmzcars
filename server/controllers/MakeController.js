require("../database/database.js");
const { Make } = require("../models/make.js");

const getAll = async (req, res) => {
  try {
    const makes = await Make.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: makes,
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
    const make = await Make.findByPk(Id);
    if (!make) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: make,
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
    await Make.create({ Make: req.body.Make })
      .then((response) => {
        res.status(200).json({
          success: 1,
          message: "Make created Succesfull",
          data: response,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: 0, message: ` error Adding make : ${err}` });
      })
      .finally(() => {});
  } catch {}
};

const update = async (req, res) => {
  try {
    const updatemake = await Make.update(
      { Make: req.body.Make },
      { where: { makeId: req.body.MakeId } }
    );
    if (!updatemake) {
      res.status(500).json({
        success: 0,
        message: ` Error Updating make : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "make Updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating make : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updatemake = await Make.update(
      { Deleted: 1 },
      { where: { MakeId: Id } }
    );
    if (!updatemake) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting make : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Make deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting make : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
