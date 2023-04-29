require("../database/database.js");
const { Faq } = require("../models/Faq.js");

const getAll = async (req, res) => {
  try {
    const Faqs = await Faq.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: Faqs,
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
    const faq = await Faq.findByPk(Id);
    if (!faq) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: faq,
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
    const { Faq, Answer } = req.body;
    await Faq.create({ Faq, Answer });
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
    const { Faq, Answer } = req.body;
    const { Id } = req.params;
    const updateFaq = await Faq.update(
      { Faq, Answer },
      { where: { FaqId: Id } }
    );
    if (!updateFaq) {
      res.status(500).json({
        success: 0,
        message: ` Error updating Faq : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Faq updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating Faq : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updateFaq = await Faq.update({ Deleted }, { where: { FaqId: Id } });
    if (!updateFaq) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting Faq : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Faq deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Faq : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
