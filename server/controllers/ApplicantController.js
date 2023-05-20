require("../database/database.js");
const { Applicant } = require("../models/applicant.js");

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
    await Applicant.create({
      Name: req.applicant.Name,
      Phone: req.applicant.Phone,
      Email: req.applicant.Email,
      Location: req.applicant.Location,
      Post: req.applicant.Post,
      Qualification: req.applicant.Qualification,
    })
      .then((response) => {
        res.status(200).json({
          success: 1,
          message: "Application submitted Succesfull",
          data: response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: 0,
          message: ` error submitting application : ${err}`,
        });
      })
      .finally(() => {});
  } catch {}
};

const update = async (req, res) => {
  try {
    const updateapplicant = await Applicant.update(
      {
        Name: req.applicant.Name,
        Phone: req.applicant.Phone,
        Email: req.applicant.Email,
        Location: req.applicant.Location,
        Post: req.applicant.Post,
        Qualification: req.applicant.Qualification,
      },
      { where: { ApplicantId: req.applicant.ApplicantId } }
    );
    if (!updateapplicant) {
      res.status(500).json({
        success: 0,
        message: ` Error Updating applicanttion : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "applicantion Updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating applicantion : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updateapplicant = await applicant.update(
      { Deleted: 1 },
      { where: { applicantId: Id } }
    );
    if (!updateapplicant) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting application : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "application deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting application : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
