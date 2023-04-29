require("../database/database.js");
const { Feature } = require("../models/Feature.js");

const getAll = async (req, res) => {
  try {
    const features = await Feature.findAll({
      where: {
        Deleted: 0,
      },
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
    const { Feature, TransId, AddedBy } = req.body;
    await Feature.create({ Feature, TransId, AddedBy });
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
    const { Feature, TransId, AddedBy } = req.body;
    const { Id } = req.params;
    const updatefeature = await Feature.update(
      { Feature, TransId, AddedBy },
      { where: { FeatureId: Id } }
    );
    if (!updatefeature) {
      res.status(500).json({
        success: 0,
        message: ` Error updating feature : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "feature updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating feature : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updatefeature = await Feature.update(
      { Deleted },
      { where: { FeatureId: Id } }
    );
    if (!updatefeature) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting feature : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "feature deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting feature : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
