const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("user", "root", "Newyork@1234", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
