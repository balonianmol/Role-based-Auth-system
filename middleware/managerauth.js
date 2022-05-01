const jwt = require("jsonwebtoken");
const dbops = require("../models/index");
const tokenVerification = async (req, res, next) => {
  try {
    const tkn = req.headers.id;
    if (!tkn) {
      res.send(" auth token required");
    } else {
      let decode = jwt.verify(tkn, "abcd");
      console.log(decode);
      let user = await dbops.admindata.findOne({
        where: { id: decode.user_id },
      });
      if (user.role === "manager" || user.role === "admin") {
        console.log(user);
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
