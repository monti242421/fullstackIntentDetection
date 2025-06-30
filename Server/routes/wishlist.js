const express = require("express");

const router = express.Router();
const wishlistcontroller = require("../controller/wishlistcontroller");
const jwtVerification = require("../middleware/authenticateJWT");

router.post(
  "/wishlist",
  jwtVerification.authenticate,
  wishlistcontroller.addtowishlist
);
router.get(
  "/wishlist",
  jwtVerification.authenticate,
  wishlistcontroller.getwishlist
);
router.delete(
  "/wishlist/:id",
  jwtVerification.authenticate,
  wishlistcontroller.deletefromwishlist
);
module.exports = router;
