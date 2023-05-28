require("../database/database.js");
const { Photo } = require("../models/Photo.js");

const getAll = async (req, res) => {
  try {
    const photos = await Photo.findAll({});
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: photos,
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
    const photo = await Photo.findByPk(Id);
    if (!photo) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: photo,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: `Error getting data : ${err}`,
    });
  }
};

const getCarImages = async (req, res) => {
  try {
    const { Id } = req.params;
    const photos = await Photo.findAll({ where: { CarId: Id } });
    if (!photos) {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    }
    res.status(200).json({
      success: 1,
      message: "Getting data succesfull",
      data: photos,
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
    const carId = req.body.CarId;
    const photo = req.body.Photo;
    // Photo.create({
    //   Photo: photo,
    //   CarId: carId,
    // });

    for (let i = 0; i < photo.length; i++) {
      const ph = photo[i];
      await Photo.create({
        Photo: ph,
        CarId: carId,
      });
    }
    res.status(200).json({
      success: 1,
      message: "photo uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    const { Id } = req.params;
    const deletePhoto = await Photo.destroy({ where: { PhotoId: Id } });
    if (!deletePhoto) {
      res.status(500).json({
        success: 0,
        message: ` Error deleting Photo : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Photo deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error deleting Photo : ${err}` });
  }
};

module.exports = {
  add,
  remove,
  getAll,
  getSingle,
  getCarImages,
};
