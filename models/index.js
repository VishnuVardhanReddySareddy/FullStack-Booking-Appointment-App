

const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user")(sequelize, Sequelize);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;

module.exports = db;
