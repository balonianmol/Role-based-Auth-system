const sequelize = require("sequelize");

const db = new sequelize("userstore", "vipin", "12345", {
  host: "localhost",
  dialect: "mysql",
});
db.authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const syncModel = async (Model) => {
  await Model.sync();
};

module.exports = { db, syncModel };
