const { Enquiry } = require("../models/Enquiry.js");

const getAll = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll();
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: enquiries,
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
    const enquiry = await Enquiry.findByPk(Id);
    if (!enquiry) {
      res.status(500).json({ success: 0, message: ` Enquiry found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting Enquiry succesfull",
      data: enquiry,
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
    const message = req.body.Message;
    const phone = req.body.Phone;
    const email = req.body.Email;
    const name = req.body.Name;
    const carId = req.body.CarId;
    await Enquiry.create({
      Message: message,
      Phone: phone,
      Email: email,
      Name: name,
      CarId: carId,
    });
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
    const message = req.body.Message;
    const phone = req.body.Phone;
    const email = req.body.Email;
    const name = req.body.Name;
    const carId = req.body.CarId;

    const id = req.body.EnquiryId;
    const updateEnquiry = await Enquiry.update(
      {
        Message: message,
        Phone: phone,
        Email: email,
        Name: name,
        CarId: carId,
      },
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
