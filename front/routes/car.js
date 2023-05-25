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
        title: "Cars List",
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
});

carRouter.get("/images/(:id)", async (req, res) => {
  await axios
    .get(API_URL + "photo/getCarImages/" + req.params.id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addcarimage", {
        data: data,
        title: "Car Details",
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

function getUsers() {
  return axios
    .get(API_URL + "user/")
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
  const models = await getModels();
  const makes = await getMakes();
  const cartypes = await getCarTypes();
  const transmissions = await getTransmissions();
  const conditions = await getConditions();
  const fueltypes = await getFuelTypes();
  const bodies = await getBodies();
  const users = await getUsers();

  const id = req.params.id;
  await axios
    .get(API_URL + "car/getOne/" + id)
    .then((response) => {
      const data = response.data.data;
      res.render("backend/admin/addcar", {
        id: id,
        Year: data.Year,
        SellingPrice: data.SellingPrice,
        Mileage: data.Mileage,
        Engine: data.Engine,
        FuelConsumption: data.FuelConsumption,
        Warrant: data.Warrant,
        CountryOfManufacture: data.CountryOfManufacture,
        ServiceHistory: data.ServiceHistory,
        RegNo: data.RegNo,
        ModelId: data.ModelId,
        MakeId: data.MakeId,
        TransmissionId: "",
        Steering: data.Steering,
        ConditionId: data.ConditionId,
        InteriorColor: data.InteriorColor,
        ExteriorColor: data.ExteriorColor,
        FuelTypeId: data.FuelTypeId,
        CarTypeId: data.CarTypeId,
        BodyId: data.BodyId,
        UserId: data.UserId,
        YearBought: data.YearBought,
        YearsUsed: data.YearsUsed,
        OtherDetails: data.OtherDetails,
        models: models,
        makes: makes,
        fueltypes: fueltypes,
        conditions: conditions,
        transmissions: transmissions,
        cartypes: cartypes,
        bodies: bodies,
        users: users,
        title: "Update Car Details",
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
  const users = await getUsers();

  const data = {
    title: "Add car",
    id: "",
    Year: "",
    SellingPrice: "",
    Mileage: "",
    Engine: "",
    FuelConsumption: "",
    Warrant: "",
    CountryOfManufacture: "",
    ServiceHistory: "",
    RegNo: "",
    ModelId: "",
    MakeId: "",
    TransmissionId: "",
    Steering: "",
    ConditionId: "",
    InteriorColor: "",
    ExteriorColor: "",
    FuelTypeId: "",
    CarTypeId: "",
    BodyId: "",
    UserId: "",
    YearBought: "",
    YearsUsed: "",
    OtherDetails: "",
    models: models,
    makes: makes,
    fueltypes: fueltypes,
    conditions: conditions,
    transmissions: transmissions,
    cartypes: cartypes,
    bodies: bodies,
    users: users,
  };

  res.render("backend/admin/addcar", data);
});

carRouter.post("/save", async (req, res) => {
  const id = req.body.id;
  const modelId = req.body.ModelId;
  const makeId = req.body.MakeId;
  const transmissionId = req.body.TransmissionId;
  const conditionId = req.body.ConditionId;
  const fuelTypeId = req.body.FuelTypeId;
  const carTypeId = req.body.CarTypeId;
  const bodyId = req.body.BodyId;
  const userId = req.body.UserId;
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
    Steering,
    InteriorColor,
    ExteriorColor,
    YearBought,
    YearsUsed,
    OtherDetails,
  } = req.body;
  const SAVE_URL = id ? `${API_URL}car/update/` : `${API_URL}car/add/`;

  console.log(req.body);

  await axios
    .post(SAVE_URL, {
      Year,
      SellingPrice,
      Mileage,
      Engine,
      FuelConsumption,
      Warrant,
      CountryOfManufacture,
      ServiceHistory,
      RegNo,
      ModelId: modelId,
      MakeId: makeId,
      TransmissionId: transmissionId,
      Steering,
      ConditionId: conditionId,
      InteriorColor,
      ExteriorColor,
      FuelTypeId: fuelTypeId,
      CarTypeId: carTypeId,
      BodyId: bodyId,
      UserId: userId,
      YearBought,
      YearsUsed,
      OtherDetails,
      CarId: id,
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
