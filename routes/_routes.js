var express = require('express');
var home = require("./home");
var users = require("./users");

var router = express.Router();
router.use("/", home);
router.use("/users", users);

module.exports = router;