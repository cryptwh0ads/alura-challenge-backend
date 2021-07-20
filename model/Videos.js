const Sequelize = require("sequelize");
const db = require("../config/db");

const VideoSchema = db.define("video", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  urlDirection: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = VideoSchema;
