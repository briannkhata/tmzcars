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

const add = async (req, res) => {
  try {
    const name = req.body.Name;
    const message = req.body.Message;
    const phone = req.body.Phone;
    const email = req.body.Email;

    await Message.create({
      Name: name,
      Message: message,
      Phone: phone,
      Email: email,
    });
    res.status(200).json({
      success: 1,
      message: "Message sent.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error creating data : ${err}` });
  }
};

module.exports = {
  add,
  getAll,
};
