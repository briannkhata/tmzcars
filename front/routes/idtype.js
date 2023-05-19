const express = require("express");
const idtypeRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

idtypeRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "idtype/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/idtypes", {
        data: data,
        title: "idtypes",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

idtypeRouter.get("/edit/(:id)", async (req, res) => {
  id = req.params.id;
  await axios
    .get(API_URL + "idtype/getOne/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addidtype", {
        id: id,
        idtype: data.IdType,
        title: "Update Id Type",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

idtypeRouter.get("/add", (req, res) => {
  const data = {
    title: "Add Id Type",
    id: "",
    idtype: "",
  };
  res.render("backend/admin/addidtype", data);
});

idtypeRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  await axios
    .post(API_URL + "idtype/add/", {
      IdType: req.body.idtype,
      IdTypeId: id,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      if (id) {
        res.redirect("/idtype/");
      } else {
        res.redirect("/idtype/add");
      }
    })
    .catch((error) => {
      req.flash("error", "Error saving idtype" + error);
      res.redirect("/idtype/add");
    });
});

idtypeRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "idtype/delete/" + id)
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/idtype");
    })
    .catch((error) => {
      req.flash("error", "Error deleting idtype " + error);
      res.redirect("/idtype");
    });
});

module.exports = idtypeRouter;
