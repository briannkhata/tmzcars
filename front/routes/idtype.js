const express = require("express");
const idtypeRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

idtypeRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "idtype/")
    .then((response) => {
      res.render("backend/admin/idtypes", {
        data: response.data.data,
        title: "idtypes",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

idtypeRouter.get("/add", async (req, res) => {
  res.render("backend/admin/addidtype", {
    id: "",
    idtype: "",
    title: "Add idtype",
  });
});

idtypeRouter.get("/edit/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "idtype/getOne/" + id)
    .then((response) => {
      res.render("backend/admin/addidtype", {
        id: id,
        idtype: response.data.data.idType,
        title: "Update idtype",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

idtypeRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id ? `${API_URL}idtype/update/` : `${API_URL}idtype/add/`;
  await axios
    .post(SAVE_URL, {
      IdType: req.body.IdType,
      IdTypeId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/idtype");
      } else {
        res.redirect("/idtype/add");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/idtype/add");
    });
});

idtypeRouter.get("/delete/(:id)", async (req, res) => {
  await axios
    .put(API_URL + "idtype/delete/" + req.params.id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/idtype/");
    })
    .catch((error) => {
      req.flash("error", "Error deleting idtype " + error);
      res.redirect("/idtype/");
    });
});

module.exports = idtypeRouter;
