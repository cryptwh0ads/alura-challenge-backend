const {Sequelize} = require("sequelize");

const dbConfig = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
});

module.exports = dbConfig;
