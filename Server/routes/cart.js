const express = require("express");

const router = express.Router();
const cartcontroller = require("../controller/cartcontoller");
const jwtVerification = require("../middleware/authenticateJWT");

router.post("/cart", jwtVerification.authenticate, cartcontroller.addtocart);
router.get("/cart", jwtVerification.authenticate, cartcontroller.getcartitems);
router.delete(
  "/cart/:id",
  jwtVerification.authenticate,
  cartcontroller.deletecartitems
);
module.exports = router;
