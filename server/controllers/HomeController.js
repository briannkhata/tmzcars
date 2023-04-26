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

const addMessage = (req, res) => {
  res.render("Post Message");
};

const signin = (req, res) => {
  res.render("signin");
};

module.exports = {
  home,
  about,
  contact,
  join,
  login,
};
