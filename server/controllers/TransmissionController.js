require("../database/database.js");
const { Transmission } = require("../models/transmission.js");

const getAll = async (req, res) => {
  try {
    const transmissions = await Transmission.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: transmissions,
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
    const transmission = await Transmission.findByPk(Id);
    if (!transmission) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: transmission,
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
    await Transmission.create({ Transmission: req.body.Transmission })
      .then((response) => {
        res.status(200).json({
          success: 1,
          message: "Transmission created Succesfull",
          data: response,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: 0, message: ` error Adding transmission : ${err}` });
      })
      .finally(() => {});
  } catch {}
};

const update = async (req, res) => {
  try {
    const updatetransmission = await Transmission.update(
      { Transmission: req.body.Transmission },
      { where: { transmissionId: req.body.TransmissionId } }
    );
    if (!updatetransmission) {
      res.status(500).json({
        success: 0,
        message: ` Error Updating transmission : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "transmission Updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating transmission : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updatetransmission = await Transmission.update(
      { Deleted: 1 },
      { where: { TransmissionId: Id } }
    );
    if (!updatetransmission) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting transmission : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "id type deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting transmission : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
