const express = require("express");
const carRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

carRouter.get("/cars", (req, res) => {
  const data = {
    title: "Car List",
  };
  res.render("backend/admin/cars", data);
});

carRouter.get("/makes", async (req, res) => {
  await axios
    .get(API_URL + "make/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/makes", {
        data: data,
        title: "Makes",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

carRouter.get("/editmake/(:id)", async (req, res) => {
  id = req.params.id;
  await axios
    .get(API_URL + "make/getOne/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addmake", {
        id: id,
        make: data.Make,
        title: "Update Make",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

carRouter.get("/models", async (req, res) => {
  await axios
    .get(API_URL + "model/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/models", {
        data: data,
        title: "Models",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

carRouter.get("/addmodel", (req, res) => {
  const data = {
    title: "Add Model",
  };
  res.render("backend/admin/addmodel", data);
});

carRouter.get("/addmake", (req, res) => {
  const data = {
    title: "Add Make",
    id: "",
    make: "",
  };
  res.render("backend/admin/addmake", data);
});

carRouter.post("/savemake", async (req, res) => {
  const id = req.body.id;
  await axios
    .post(API_URL + "make/save/", {
      Make: req.body.Make,
      MakeId: id,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      if (id) {
        res.redirect("/car/makes");
      } else {
        res.redirect("/car/addmake");
      }
    })
    .catch((error) => {
      req.flash("error", "Error saving Make" + error);
      res.redirect("/car/addmake");
    });
});

carRouter.get("/deletemake/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "make/delete/" + id)
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/car/makes");
    })
    .catch((error) => {
      req.flash("error", "Error deleting Make " + error);
      res.redirect("/car/makes");
    });
});

carRouter.post("/addmodel", async (req, res) => {
  await axios
    .post(API_URL + "model/add/", {
      Model: req.body.Model,
    })
    .then((response) => {
      req.flash("success", "Saving Model successfull");
      res.redirect("/car/addmodel");
    })
    .catch((error) => {
      req.flash("error", "Error saving Model" + error);
      res.redirect("/car/addmodel");
    });
});

module.exports = carRouter;
