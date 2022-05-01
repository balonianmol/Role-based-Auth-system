const { db, syncModel } = require("../db/dbConfig");
const { Sequelize } = require("sequelize");
const Task = require("./task");
const User = require("./user");
const UserTask = db.define("usertask", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  taskId: {
    type: Sequelize.INTEGER,
    references: {
      model: "tasks",
      key: "id",
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
  },
});

Task.belongsToMany(User, { through: UserTask });
User.belongsToMany(Task, { through: UserTask });

syncModel(UserTask);

module.exports = UserTask;
