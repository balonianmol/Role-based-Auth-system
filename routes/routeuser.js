const router = require("express").Router();
const usercrud =require("../controllers/usercontrol")
const auth = require("../middleware/userauth")
router.post('/user/register',usercrud.register)
module.exports = router