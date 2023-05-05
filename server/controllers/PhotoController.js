require("../database/database.js");
const { Photo } = require("../models/Photo.js");

const getAll = async (req, res) => {
  try {
    const photos = await Photo.findAll({
      where: {
        Deleted: 0,
      },
    });
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

const add = async (req, res) => {
  try {
    const carId = req.body.CarId;
    const photo = req.files;
    const fileName = photo[Object.keys(photo)[0]].name;
    if (!photo) {
      res.status(500).json({
        success: 0,
        message: ` please select photo to upload`,
      });
    }

    if (/^image/.test(photo.mimetype)) {
      res.status(500).json({
        success: 0,
        message: `please select proper file format to upload`,
      });
    }

    await Photo.create({
      Photo: fileName,
      CarId: carId,
    });

    photo.mv(__dirname + "/public/uploads/" + photo.name);

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
    const { Photo } = req.body;
    const { Id } = req.params;
    const updatePhoto = await Photo.update(
      { Photo },
      { where: { PhotoId: Id } }
    );
    if (!updatePhoto) {
      res.status(500).json({
        success: 0,
        message: ` Error updating Photo : ${err}`,
      });
    }
    res.status(200).json({
      success: 1,
      message: "Photo updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: ` Error updating Photo : ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    const Deleted = 1;
    const { Id } = req.params;
    const updatePhoto = await Photo.update(
      { Deleted },
      { where: { PhotoId: Id } }
    );
    if (!updatePhoto) {
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
  update,
};
