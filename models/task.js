const { db, syncModel } = require("../db/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");
const Task = db.define("task", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  managerId: {
    type: Sequelize.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
  },
  description: {
    type: Sequelize.STRING,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["open", "ready", "in-review", "completed"],
  },
});

syncModel(Task);

module.exports = Task;
