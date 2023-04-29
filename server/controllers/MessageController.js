require("../database/database.js");
const { Message } = require("../models/Message.js");

const getAll = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: messages,
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
    const message = await Message.findByPk(Id);
    if (!message) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: message,
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
    const { Name, Message, Phone, Email } = req.body;
    await Message.create({ Name, Message, Phone, Email });
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
    const { Name, Message, Phone, Email } = req.body;
    const { Id } = req.params;
    const updateMessage = await Message.update(
      { Name, Message, Phone, Email },
      { where: { MessageId: Id } }
    );
    if (!updateMessage) {
      res.status(500).json({
        success: 0,
        message: ` Error updating Message : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Message updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating Message : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updateMessage = await Message.update(
      { Deleted },
      { where: { MessageId: Id } }
    );
    if (!updateMessage) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting Message : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Message deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Message : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
