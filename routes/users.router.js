const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controller/users.controller");
const invalidMethodHandler = require("../errors/invalidMethodHandler");

router.route("/").get(getAllUsers).all(invalidMethodHandler);
module.exports = router;
