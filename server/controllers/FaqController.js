require("../database/database.js");
const { Faq } = require("../models/faq.js");

const getAll = async (req, res) => {
  try {
    const faqs = await Faq.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: faqs,
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
    const faq = await faq.findByPk(Id);
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
    await Faq.create({
      Faq: req.body.Faq,
      Answer: req.body.Answer,
    })
      .then((response) => {
        res.status(200).json({
          success: 1,
          message: "faq created Succesfull",
          data: response,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: 0, message: ` error Adding faq : ${err}` });
      })
      .finally(() => {});
  } catch {}
};

const update = async (req, res) => {
  try {
    const updatefaq = await Faq.update(
      {
        Faq: req.body.Faq,
        Answer: req.body.Answer,
      },
      { where: { FaqId: req.body.FaqId } }
    );
    if (!updatefaq) {
      res.status(500).json({
        success: 0,
        message: ` Error Updating faq : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "faq Updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating faq : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updatefaq = await Faq.update(
      { Deleted: 1 },
      { where: { FaqId: Id } }
    );
    if (!updatefaq) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting Faq : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "faq deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting faq : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
