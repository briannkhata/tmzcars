require("../database/database.js");
const { Partner } = require("../models/Partner.js");

const getAll = async (req, res) => {
  try {
    const partners = await Partner.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: partners,
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
    const partner = await Partner.findByPk(Id);
    if (!partner) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: partner,
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
    const { Partner, Logo } = req.body;
    await Partner.create({ Partner, Logo });
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
    const { Partner, Logo } = req.body;
    const { Id } = req.params;
    const updatepartner = await Partner.update(
      { Partner, Logo },
      { where: { partnerId: Id } }
    );
    if (!updatepartner) {
      res.status(500).json({
        success: 0,
        message: ` Error updating partner : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "partner updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating partner : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updatepartner = await Partner.update(
      { Deleted },
      { where: { partnerId: Id } }
    );
    if (!updatepartner) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting partner : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "partner deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting partner : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
