const express = require("express");

const router = express.Router();
const ordercontroller = require("../controller/ordercontroller");
const jwtVerification = require("../middleware/authenticateJWT");

router.post("/order", jwtVerification.authenticate, ordercontroller.placeorder);
router.get("/order", jwtVerification.authenticate, ordercontroller.getorders);
module.exports = router;
