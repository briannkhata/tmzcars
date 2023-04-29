require("../database/database.js");
const { Body } = require("../models/Body.js");

const getAll = async (req, res) => {
  try {
    const bodies = await Body.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: bodies,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error getting car bodies : ${err}` });
  }
};

const getSingle = async (req, res) => {
  try {
    const { Id } = req.params;
    const body = await Body.findByPk(Id);
    if (!body) {
      res.status(500).json({ success: 0, message: ` Body Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting car body succesfull",
      data: body,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error getting body Not found : ${err}` });
  }
};

const add = async (req, res) => {
  try {
    const body = req.body.Body;
    await Body.create({ Body: body });
    res.status(200).json({
      success: 1,
      message: "Car Body Created",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error creating car body : ${err}` });
  }
};

const update = async (req, res) => {
  try {
    const body = req.body.Body;
    const { Id } = req.params;
    const updateBody = await Body.update(
      { Body: body },
      { where: { BodyId: Id } }
    );
    if (!updateBody) {
      res.status(500).json({
        success: 0,
        message: ` Error updating car body : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Car body updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating car body : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updateBody = await Body.update(
      { Deleted },
      { where: { BodyId: Id } }
    );
    if (!updateBody) {
      res
        .status(500)
        .json({ success: 0, message: ` Error deleting car body : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Car body deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting car body : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
