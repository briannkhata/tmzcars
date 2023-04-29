require("../database/database.js");
const { Attribute } = require("../models/Attribute.js");

const getAll = async (req, res) => {
  try {
    const attributes = await Attribute.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: attributes,
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
    const attribute = await Attribute.findByPk(Id);
    if (!attribute) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: attribute,
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
    const { Attribute, AttributeValue } = req.body;
    await Attribute.create({
      Attribute,
      AttributeValue,
    });
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
    const { Attribute, AttributeValue } = req.body;
    const { Id } = req.params;
    const updateAttribute = await Attribute.update(
      { Attribute, AttributeValue },
      { where: { AttributeId: Id } }
    );
    if (!updateAttribute) {
      res.status(500).json({
        success: 0,
        message: ` Error updating Attribute : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Attribute updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating Attribute : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updateAttribute = await Attribute.update(
      { Deleted },
      { where: { AttributeId: Id } }
    );
    if (!updateAttribute) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting Attribute : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Attribute deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Attribute : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
