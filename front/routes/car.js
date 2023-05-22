const express = require("express");
const carRouter = express.Router();
const axios = require("axios");
const API_URL = "http://127.0.0.1:7002/api/v1/";

carRouter.get("/", async (req, res) => {
  await axios
    .get(API_URL + "car/")
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/cars", {
        data: data,
        title: "cars",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

function getModels() {
  return axios
    .get(API_URL + "model/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getCarTypes() {
  return axios
    .get(API_URL + "cartype/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getFuelTypes() {
  return axios
    .get(API_URL + "fueltype/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getConditions() {
  return axios
    .get(API_URL + "condition/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getTransmissions() {
  return axios
    .get(API_URL + "transmission/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getMakes() {
  return axios
    .get(API_URL + "make/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getBodies() {
  return axios
    .get(API_URL + "body/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

carRouter.get("/edit/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "car/getOne/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addcar", {
        id: id,
        car: data.car,
        title: "Update car",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

carRouter.get("/add", async (req, res) => {
  const models = await getModels();
  const makes = await getMakes();
  const cartypes = await getCarTypes();
  const transmissions = await getTransmissions();
  const conditions = await getConditions();
  const fueltypes = await getFuelTypes();
  const bodies = await getBodies();

  const data = {
    title: "Add car",
    id: "",
    car: "",
    models: models,
    makes: makes,
    fueltypes: fueltypes,
    conditions: conditions,
    transmissions: transmissions,
    cartypes: cartypes,
    bodies: bodies,
  };

  res.render("backend/admin/addcar", data);
});

carRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  const {
    Year,
    SellingPrice,
    Mileage,
    Engine,
    FuelConsumption,
    Warrant,
    CountryOfManufacture,
    ServiceHistory,
    RegNo,
    ModelId,
    MakeId,
    TransmissionId,
    Steering,
    ConditionId,
    InteriorId,
    ExteriorId,
    FuelTypeId,
    CarTypeId,
    UserId,
    BodyId,
    YearBought,
    YearsUsed,
    OtherDetails,
  } = req.body;
  await axios
    .post(API_URL + "car/add/", {
      dataTosend,
    })
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      if (id) {
        res.redirect("/car/");
      } else {
        res.redirect("/car/add");
      }
    })
    .catch((error) => {
      req.flash("error", "Error saving car" + error);
      res.redirect("/car/add");
    });
});

carRouter.get("/delete/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .put(API_URL + "car/delete/" + id)
    .then((response) => {
      const data = response.data;
      req.flash("success", data.message);
      res.redirect("/car");
    })
    .catch((error) => {
      req.flash("error", "Error deleting car " + error);
      res.redirect("/car");
    });
});

module.exports = carRouter;
