require("../database/database.js");
const { Make } = require("../models/Make.js");

const getAll = async (req, res) => {
  try {
    const makes = await Make.findAll({
      where: {
        Deleted: 0,
      },
    });
    res.status(200).json({
      success: 1,
      message: "Data Retrieved successfully",
      data: makes,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: 0, message: `Error getting data : ${err}` });
  }
};

const getSingle = async (req, res) => {
  const { Id } = req.params;
  await Make.findByPk(Id)
    .then((response) => {
      res.status(200).json({
        success: 1,
        message: "Getting data succesfull",
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).json({ success: 0, message: ` Data Not found : ${err}` });
    })
    .finally(() => {});
};

const save = async (req, res) => {
  try {
    const make = req.body.Make;
    const id = req.body.MakeId;
    console.log(make);
    console.log(id);
    if (!id) {
      await Make.create({ Make: make })
        .then((response) => {
          res.status(200).json({
            success: 1,
            message: "Make created succesfull",
            data: response,
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ success: 0, message: ` error adding make : ${err}` });
        })
        .finally(() => {});
    } else {
      await Make.update({ Make: make }, { where: { MakeId: id } })
        .then((response) => {
          res.status(200).json({
            success: 1,
            message: "Make Updated succesfully",
            data: response,
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ success: 0, message: ` error updating make : ${err}` });
        })
        .finally(() => {});
    }
  } catch {}
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await Make.update({ Deleted: 1 }, { where: { MakeId: id } })
      .then((response) => {
        res.status(200).json({
          success: 1,
          message: "make deleted successfully",
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: 0, message: ` Error deleting make : ${err}` });
      })
      .finally(() => {});
  } catch (err) {}
};

module.exports = {
  save,
  remove,
  getAll,
  getSingle,
};
