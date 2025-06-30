const express = require("express");

const router = express.Router();
const productscontroller = require("../controller/productscontroller");

router.get("/products", productscontroller.productscontroller);
router.post("/searchproducts", productscontroller.searchcontroller);

module.exports = router;
