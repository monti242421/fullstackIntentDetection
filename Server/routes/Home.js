const express = require("express");

const router = express.Router();
const homecontroller = require("../controller/homecontroller");

router.get("/home", homecontroller.homecontroller);

module.exports = router;
