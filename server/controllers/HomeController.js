const home = (req, res) => {
  res.render("home");
};
const about = (req, res) => {
  res.render("about");
};
const contact = (req, res) => {
  res.render("contact");
};
const join = (req, res) => {
  res.render("join");
};
const login = (req, res) => {
  res.render("login");
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
