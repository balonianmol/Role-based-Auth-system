const { db, syncModel } = require("../db/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const User = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: { type: Sequelize.STRING, unique: true },
  password: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING, unique: true },
  role: {
    type: DataTypes.ENUM,
    values: ["admin", "user", "manager"],
    // validate: {
    //   customValidator(value) {
    //     if (value !== "admin" || value !== "user" || value !== "manager") {
    //       throw new Error("role must be one of these: admin, user, manager");
    //     }
    //   },
    // },
  },
  firstname: { type: Sequelize.STRING },
  lastname: { type: Sequelize.STRING },
  phonenumber: { type: Sequelize.INTEGER },
  address: { type: Sequelize.STRING },
});

User.hasMany(User, { foreignKey: "managerId", as: "myUsers" });
User.belongsTo(User, { foreignKey: "managerId", as: "manager" });

syncModel(User);
module.exports = User;
