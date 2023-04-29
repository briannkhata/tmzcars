require("../database/database.js");
const { Applicant } = require("../models/Applicant.js");

const getAll = async (req, res) => {
  try {
    const applicants = await Applicant.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: applicants,
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
    const applicant = await Applicant.findByPk(Id);
    if (!applicant) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: applicant,
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
    const { Name, Applicant, Phone, Email, Location, Post, Qualification } =
      req.body;
    await Applicant.create({
      Name,
      Applicant,
      Phone,
      Email,
      Location,
      Post,
      Qualification,
    });
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
    const { Name, Applicant, Phone, Email, Location, Post, Qualification } =
      req.body;
    const { Id } = req.params;
    const updateApplicant = await Applicant.update(
      { Name, Applicant, Phone, Email, Location, Post, Qualification },
      { where: { ApplicantId: Id } }
    );
    if (!updateApplicant) {
      res.status(500).json({
        success: 0,
        message: ` Error updating Applicant : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Applicant updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating Applicant : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updateApplicant = await Applicant.update(
      { Deleted },
      { where: { ApplicantId: Id } }
    );
    if (!updateApplicant) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting Applicant : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Applicant deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Applicant : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
