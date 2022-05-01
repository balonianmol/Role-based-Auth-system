const dbops = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userStorage = require("../models/user");
const models = require("../models/index");
const { assinment } = require("../models/index");

const login = async (req, res) => {
  try {
    let user = await dbops.admindata.findOne({
      where: { username: req.body.username },
    });
    if (user.role == "manager") {
      let decryption = await bcrypt.compare(req.body.password, user.password);
      if (decryption == true) {
        let token = jwt.sign({ user_id: user.id }, "abcd", {
          expiresIn: "1h",
        });
        res.send(token);
      }
    } else {
      res.send("invalid login ");
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 0,
      message: error,
    });
  }
};
const checkUsers = async (req, res) => {
  try {
    let uid = req.user.user_id;

    let userList = await dbops.admindata.findAll({
      include: ["myUsers"],
      where: {
        id: uid,
      },
    });
    // users.every((user) => console.log(user.toJSON()));
    res.send(userList);
  } catch (error) {
    console.log(error);
    res.json({
      status: 0,
      message: error,
    });
  }
};
const createtask = async (req, res) => {
  try {
    let uid = req.user;
    let taskcreate = await dbops.taskcreate.create({
      managerId: uid.user_id,
      description: req.body.description,
      status: req.body.status,
    });
    let token = jwt.sign({ user_id: taskcreate.id }, "abcd", {
      expiresIn: "1h",
    });
    res.send(token);
  } catch (error) {
    console.log(error);
    res.json({
      status: 0,
      message: error,
    });
  }
};
const updateTask = async (req, res) => {
  try {
    let uid = req.user;
    let taskcreate = await dbops.taskcreate.update(
      {
        task: req.body.task,
      },
      { where: { managerid: uid.user_id } }
    );
    res.send("task updated");
  } catch (error) {
    console.log(error);
    res.json({
      status: 0,
      message: error,
    });
  }
};
const deletetask = async (req, res) => {
  try {
    let uid = req.user;
    let task = await dbops.taskcreate.findOne({
      where: { id: uid.registration },
    });
    if (task) {
      await dbops.destroy({ where: { id: uid.registration } });
      res.send("task deleted");
    } else {
      res.send("no such task");
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 0,
      message: error,
    });
  }
};
const assigntask = async (req, res) => {
  try {
    let tid = jwt.verify(req.headers.taskid, "abcd");
    let user = await dbops.admindata.findOne({
      where: { username: req.body.user },
    });
    let assignTask = dbops.taskassgin.create({
      taskId: tid.user_id,
      userId: user.id,
    });
    if (assignTask) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 0,
      message: error,
    });
  }
};
module.exports = {
  login,
  checkUsers,
  createtask,
  updateTask,
  assigntask,
  deletetask,
};
