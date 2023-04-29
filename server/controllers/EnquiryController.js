const { Enquiry } = require("../models/Enquiry.js");

const getAll = async (req, res) => {
  try {
    const Enquirys = await Enquiry.findAll();
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: Enquirys,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error getting enquiries : ${err}` });
  }
};

const getSingle = async (req, res) => {
  try {
    const { Id } = req.params;
    const Enquiry = await Enquiry.findByPk(Id);
    if (!Enquiry) {
      res.status(500).json({ success: 0, message: ` Enquiry found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Enquiry succesfull",
      data: Enquiry,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting Enquiry : ${err}`,
    });
  }
};

const add = async (req, res) => {
  try {
    const { Message, Phone, Email, Name } = req.body;
    await Enquiry.create({ Message, Phone, Email, Name });
    res.status(200).json({
      success: 1,
      message: "Enquiry Created",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error adding enquiry : ${err}` });
  }
};

const update = async (req, res) => {
  try {
    const { Message, Phone, Email, Name } = req.body;
    const id = req.body.EnquiryId;
    const updateEnquiry = await Enquiry.update(
      { Message, Phone, Email, Name },
      { where: { EnquiryId: id } }
    );
    if (!updateEnquiry) {
      res.status(500).json({
        success: 0,
        message: ` Error updating Enquiry : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Enquiry updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating Enquiry : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updateEnquiry = await Enquiry.destroy({ where: { EnquiryId: Id } });
    if (!updateEnquiry) {
      res
        .status(500)
        .json({ success: 0, message: ` Error deleting Enquiry: ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Enquiry deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Enquiry : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
