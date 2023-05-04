require("../database/database.js");
const { use } = require("passport");
const { Testimonial } = require("../models/Testimonial.js");

const getAll = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: testimonials,
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
    const testimonial = await Testimonial.findByPk(Id);
    if (!testimonial) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: testimonial,
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
    const testimonial = req.body.Testimonial;
    const user = req.body.Testimonial;
    const role = req.body.Role;

    await Testimonial.create({
      Testimonial: testimonial,
      User: user,
      Role: role,
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
    const testimonial = req.body.Testimonial;
    const user = req.body.Testimonial;
    const role = req.body.Role;

    const { Id } = req.params;
    const updateTestimonial = await Testimonial.update(
      {
        Testimonial: testimonial,
        User: user,
        Role: role,
      },
      { where: { TestimonialId: Id } }
    );
    if (!updateTestimonial) {
      res.status(500).json({
        success: 0,
        message: ` Error updating Testimonial : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Testimonial updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating Testimonial : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updateTestimonial = await Testimonial.update(
      { Deleted: 1 },
      { where: { TestimonialId: Id } }
    );
    if (!updateTestimonial) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting Testimonial : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Testimonial deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Testimonial : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
