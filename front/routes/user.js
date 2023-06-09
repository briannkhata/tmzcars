const express = require("express");
const userRouter = express.Router();
const axios = require("axios");
const checkAuth = require("../middleware/CheckAuth.js");

const API_URL = "http://127.0.0.1:7002/api/v1/";

userRouter.get("/changepassword", checkAuth, async (req, res) => {
  const data = {
    title: "Change Password",
  };
  res.render(
    "backend/" + req.session.user.Role.toLowerCase() + "/changepassword",
    data
  );
});

userRouter.get("/changephone", checkAuth, async (req, res) => {
  const data = {
    title: "Change Phone",
  };
  res.render(
    "backend/" + req.session.user.Role.toLowerCase() + "/changephone",
    data
  );
});

userRouter.get("/addadmin", checkAuth, async (req, res) => {
  res.render("backend/" + req.session.user.Role.toLowerCase() + "/addadmin", {
    id: "",
    name: "",
    phone: "",
    email: "",
    title: "Add Admin",
    name: req.session.user.Name,
    id: req.session.user.UserId,
  });
});

userRouter.get("/profile/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "user/getOne/" + id)
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/profile",
        {
          id: id,
          name: response.data.data.Name,
          phone: response.data.data.Phone,
          email: response.data.data.Email,
          password: response.data.data.Password,
          address: response.data.data.Address,
          altphone: response.data.data.AltPhone,
          country: response.data.data.Country,
          city: response.data.data.City,
          region: response.data.data.Region,
          idnumber: response.data.data.IdNumber,
          idtype: response.data.data.IdType.IdType,
          title: "Update Profile",
          name: req.session.user.Name,
          id: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

function getIdTypes() {
  return axios
    .get(API_URL + "idtype/")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

userRouter.get("/verifyaccount/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  const idTypes = await getIdTypes();
  await axios
    .get(API_URL + "user/getOne/" + id)
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/verifyaccount",
        {
          id: id,
          name: response.data.data.Name,
          phone: response.data.data.Phone,
          idnumber: response.data.data.IdNumber,
          idtypee: response.data.data.IdTypeId,
          title: "Verify Account",
          idtypes: idTypes,
          name: req.session.user.Name,
          id: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

userRouter.post("/saveid", checkAuth, async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = `${API_URL}user/verifyaccount/`;
  await axios
    .post(SAVE_URL, {
      IdNumber: req.body.IdNumber,
      IdTypeId: req.body.IdTypeId,
      UserId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/user/verifyaccount/" + id);
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/user/verifyaccount/" + id);
    });
});

userRouter.get("/changephone/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "user/getOne/" + id)
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/changephone",
        {
          id: id,
          name: response.data.data.Name,
          phone: response.data.data.Phone,
          title: "Change Phone",
          name: req.session.user.Name,
          id: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

userRouter.post("/updatephone", checkAuth, async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = `${API_URL}user/updatephone/`;
  await axios
    .post(SAVE_URL, {
      Phone: req.body.Phone,
      UserId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/user/changephone/" + id);
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/user/changephone/" + id);
    });
});

userRouter.get("/changepassword/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "user/getOne/" + id)
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/changepassword",
        {
          id: id,
          name: response.data.data.Name,
          phone: response.data.data.Phone,
          title: "Change Password",
          name: req.session.user.Name,
          id: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

userRouter.post("/updatepassword", checkAuth, async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = `${API_URL}user/updatepassword/`;
  await axios
    .post(SAVE_URL, {
      Password: req.body.Password,
      UserId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/user/changepassword/" + id);
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/user/changepassword/" + id);
    });
});

userRouter.post("/updateprofile", checkAuth, async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = `${API_URL}user/updateprofile/`;
  await axios
    .post(SAVE_URL, {
      Name: req.body.Name,
      Email: req.body.Email,
      Address: req.body.Address,
      Country: req.body.Country,
      City: req.body.City,
      Region: req.body.Region,
      AltPhone: req.body.AltPhone,
      UserId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/user/profile/" + id);
    })
    .catch((error) => {
      req.flash("error", error.toString());
      res.redirect("/user/profile/" + id);
    });
});

userRouter.get("/editadmin/(:id)", checkAuth, async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "user/getOne/" + id)
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/addadmin",
        {
          id: id,
          name: response.data.data.Name,
          phone: response.data.data.Phone,
          email: response.data.data.Email,
          password: response.data.data.Password,
          title: "Update Admin",
          name: req.session.user.Name,
          id: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

userRouter.post("/saveadmin", checkAuth, async (req, res) => {
  const id = req.body.id;
  const SAVE_URL = id ? `${API_URL}user/update/` : `${API_URL}user/add/`;
  await axios
    .post(SAVE_URL, {
      Name: req.body.Name,
      Email: req.body.Email,
      Phone: req.body.Phone,
      Password: req.body.Password,
      UserId: id,
    })
    .then((response) => {
      req.flash("success", response.data.message);
      if (id) {
        res.redirect("/user/admins");
      } else {
        res.redirect("/user/addadmin");
      }
    })
    .catch((error) => {
      req.flash("error", error.toString());
      if (id) {
        res.redirect("/user/admins");
      } else {
        res.redirect("/user/addadmin");
      }
    });
});

userRouter.get("/admins", checkAuth, async (req, res) => {
  await axios
    .get(API_URL + "user/getAdmins/")
    .then((response) => {
      res.render("backend/" + req.session.user.Role.toLowerCase() + "/admins", {
        data: response.data.data,
        title: "Admins",
        name: req.session.user.Name,
        id: req.session.user.UserId,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

userRouter.get("/users", checkAuth, async (req, res) => {
  await axios
    .get(API_URL + "user/getSellers/")
    .then((response) => {
      res.render("backend/" + req.session.user.Role.toLowerCase() + "/users", {
        data: response.data.data,
        title: "Users",
        name: req.session.user.Name,
        id: req.session.user.UserId,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

userRouter.get("/confirmed", checkAuth, async (req, res) => {
  await axios
    .get(API_URL + "user/getConfirmed/")
    .then((response) => {
      res.render(
        "backend/" + req.session.user.Role.toLowerCase() + "/confirmedusers",
        {
          data: response.data.data,
          title: "Confirmed Users",
          name: req.session.user.Name,
          id: req.session.user.UserId,
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

userRouter.get("/delete/(:id)", checkAuth, async (req, res) => {
  await axios
    .put(API_URL + "user/delete/" + req.params.id)
    .then((response) => {
      req.flash("success", response.data.message);
      res.redirect("/user/admins");
    })
    .catch((error) => {
      req.flash("error", "Error deleting user " + error);
      res.redirect("/user/admins");
    });
});

module.exports = userRouter;
