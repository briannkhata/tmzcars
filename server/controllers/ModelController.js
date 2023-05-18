require("../database/database.js");
const { Model } = require("../models/Model.js");

const getAll = async (req, res) => {
  try {
    const models = await Model.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: models,
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
    const model = await Model.findByPk(Id);
    if (!model) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: model,
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
    const model = req.body.Model;
    const id = req.body.ModelId;

    if (id == "") {
      await Model.create({ Model: model })
        .then((response) => {
          res.status(200).json({
            success: 1,
            message: "model created succesfull",
            data: response,
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ success: 0, message: ` error adding model : ${err}` });
        })
        .finally(() => {});
    } else {
      await model
        .update({ Model: model }, { where: { ModelId: id } })
        .then((response) => {
          res.status(200).json({
            success: 1,
            message: "model Updated succesfully",
            data: response,
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ success: 0, message: ` error updating model : ${err}` });
        })
        .finally(() => {});
    }
  } catch {}
};

const update = async (req, res) => {
  try {
    const model = req.body.Model;
    const { Id } = req.params;
    const updatemodel = await Model.update(
      { Model: model },
      { where: { modelId: Id } }
    );
    if (!updatemodel) {
      res.status(500).json({
        success: 0,
        message: ` Error updating model : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "model updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating model : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updatemodel = await Model.update(
      { Deleted: 1 },
      { where: { ModelId: Id } }
    );
    if (!updatemodel) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting model : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "model deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting model : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
