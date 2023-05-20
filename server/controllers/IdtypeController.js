require("../database/database.js");
const { IdType } = require("../models/idtype.js");

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
    await IdType.create({ IdType: req.body.IdType })
      .then((response) => {
        res.status(200).json({
          success: 1,
          message: "id Type created Succesfull",
          data: response,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: 0, message: ` error Adding idtype : ${err}` });
      })
      .finally(() => {});
  } catch {}
};

const update = async (req, res) => {
  try {
    const updateidtype = await IdType.update(
      { IdType: req.body.IdType },
      { where: { IdTypeId: req.body.IdTypeId } }
    );
    if (!updateidtype) {
      res.status(500).json({
        success: 0,
        message: ` Error Updating idtype : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "idtype Updated successfully",
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
      message: "id type deleted successfully",
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
