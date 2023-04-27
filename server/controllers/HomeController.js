const home = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};
const about = (req, res) => {
  res.render("about", { pageTitle: "About Us" });
};
const contact = (req, res) => {
  res.render("contact", { pageTitle: "Contact Us" });
};
const join = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
const login = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

const register = (req, res) => {
  const { Name, Phone, Passord } = req.body;
  res.send("Register with " + Name);
};

const signin = (req, res) => {
  const { Phone, Passord } = req.body;
  res.send("Login with " + Phone);
};

module.exports = {
  home,
  about,
  contact,
  join,
  login,
  register,
  signin,
};
