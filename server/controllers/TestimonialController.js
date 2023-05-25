require("../database/database.js");
const { Testimonial } = require("../models/testimonial.js");

const getAll = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      where: {
        Deleted: 0,
      },
      include: [
        {
          model: User,
        },
      ],
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
    await Testimonial.create({
      Testimonial: req.body.Testimonial,
      Role: req.body.Role,
      UserId: req.body.UserId,
    })
      .then((response) => {
        res.status(200).json({
          success: 1,
          message: "Testimonial created Succesfull",
          data: response,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: 0, message: ` error Adding testimonial : ${err}` });
      })
      .finally(() => {});
  } catch {}
};

const update = async (req, res) => {
  try {
    const updatetestimonial = await Testimonial.update(
      {
        Testimonial: req.body.Testimonial,
        Role: req.body.Role,
        UserId: req.body.UserId,
      },
      { where: { TestimonialId: req.body.TestimonialId } }
    );
    if (!updatetestimonial) {
      res.status(500).json({
        success: 0,
        message: ` Error Updating testimonial : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "testimonial Updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating testimonial : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const updatetestimonial = await Testimonial.update(
      { Deleted: 1 },
      { where: { TestimonialId: Id } }
    );
    if (!updatetestimonial) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting testimonial : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Testimonial deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting testimonial : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  update,
};
