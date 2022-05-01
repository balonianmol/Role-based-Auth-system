const jwt = require("jsonwebtoken");
const dbops = require("../models/index");
const tokenVerification = async (req, res, next) => {
  try {
    const tkn = req.headers.id;
    if (!tkn) {
      res.send(" auth token required");
    } else {
      let decode = jwt.verify(tkn, "abcd");
      let user = await dbops.dataWrite.findOne({
        where: { id: decode.registration },
      });
      if (
        user.role == "user" ||
        user.role == "admin" ||
        user.role == "manager"
      ) {
        req.user = decode;
        next();
      } else {
        res.send("you dont have reqired permission");
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: error,
    });
  }
};
module.exports = tokenVerification;
