require("../database/database.js");
const { IdType } = require("../models/IdType.js");

const getAll = async (req, res) => {
  try {
    const idtypes = await IdType.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: idtypes,
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
    const idtype = await IdType.findByPk(Id);
    if (!idtype) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: idtype,
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
    const idType = req.body.IdType;
    await IdType.create({ IdType: idType });
    res.status(200).json({
      success: 1,
      message: "Data Created",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error creating data : ${err}` });
  }
};

const update = async (req, res) => {
  try {
    const idType = req.body.IdType;
    const { Id } = req.params;
    const updateidtype = await IdType.update(
      { IdType: idType },
      { where: { IdTypeId: Id } }
    );
    if (!updateidtype) {
      res.status(500).json({
        success: 0,
        message: ` Error updating idtype : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "idtype updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating idtype : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updateidtype = await IdType.update(
      { Deleted: 1 },
      { where: { IdTypeId: Id } }
    );
    if (!updateidtype) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting idtype : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "idtype deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting idtype : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
