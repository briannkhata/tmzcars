require("../database/database.js");
const { Body } = require("../models/body.js");

const getAll = async (req, res) => {
  try {
    const bodys = await Body.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: bodys,
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
    const body = await Body.findByPk(Id);
    if (!body) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: body,
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
    await Body.create({ Body: req.body.Body })
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
          .json({ success: 0, message: ` error Adding body : ${err}` });
      })
      .finally(() => {});
  } catch {}
};

const update = async (req, res) => {
  try {
    const updatebody = await Body.update(
      { Body: req.body.Body },
      { where: { BodyId: req.body.BodyId } }
    );
    if (!updatebody) {
      res.status(500).json({
        success: 0,
        message: ` Error Updating body : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "body Updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating body : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updatebody = await Body.update(
      { Deleted: 1 },
      { where: { BodyId: Id } }
    );
    if (!updatebody) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting body : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "car body deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting body : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
