const express = require("express");
const userRouter = express.Router();
const axios = require("axios");

const API_URL = "http://127.0.0.1:7002/api/v1/";

userRouter.get("/verifyaccount", (req, res) => {
  const data = {
    title: "Verify Account",
  };
  res.render("backend/admin/verifyaccount", data);
});

userRouter.get("/changepassword", (req, res) => {
  const data = {
    title: "Change Password",
  };
  res.render("backend/admin/changepassword", data);
});

userRouter.get("/changephone", (req, res) => {
  const data = {
    title: "Change Phone",
  };
  res.render("backend/admin/changephone", data);
});

userRouter.get("/payments", (req, res) => {
  const data = {
    title: "Payments",
  };
  res.render("backend/admin/payments", data);
});

userRouter.get("/addadmin", async (req, res) => {
  res.render("backend/admin/addadmin", {
    id: "",
    name: "",
    phone: "",
    email: "",
    title: "Add Admin",
  });
});

userRouter.get("/editadmin/(:id)", async (req, res) => {
  const id = req.params.id;
  await axios
    .get(API_URL + "user/getOne/" + id)
    .then((response) => {
      res.render("backend/admin/addadmin", {
        id: id,
        name: response.data.data.Name,
        phone: response.data.data.Phone,
        email: response.data.data.Email,
        password: response.data.data.Password,
        title: "Update Admin",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

userRouter.post("/saveadmin", async (req, res) => {
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

userRouter.get("/admins", async (req, res) => {
  await axios
    .get(API_URL + "user/getAdmins/")
    .then((response) => {
      res.render("backend/admin/admins", {
        data: response.data.data,
        title: "Admins",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

userRouter.get("/users", async (req, res) => {
  await axios
    .get(API_URL + "user/getSellers/")
    .then((response) => {
      res.render("backend/admin/users", {
        data: response.data.data,
        title: "Users",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

userRouter.get("/confirmed", async (req, res) => {
  await axios
    .get(API_URL + "user/getConfirmed/")
    .then((response) => {
      res.render("backend/admin/confirmedusers", {
        data: response.data.data,
        title: "Confirmed Users",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

userRouter.get("/delete/(:id)", async (req, res) => {
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
