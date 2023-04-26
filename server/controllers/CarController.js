const getAll = (req, res) => {
  res.send("All");
};
const getOne = (req, res) => {
  res.send("get One");
};

const getByCategory = (req, res) => {
  res.send("getBy Category");
};

const remove = (req, res) => {
  res.send("remove");
};

const searchCar = (req, res) => {
  res.send("search car");
};

const update = (req, res) => {
  res.send("update");
};

const addCar = (req, res) => {
  res.send("add");
};

module.exports = {
  getAll,
  getOne,
  remove,
  update,
  searchCar,
  getByCategory,
  addCar,
};
