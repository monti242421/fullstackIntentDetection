const { where } = require("sequelize");
const cartItem = require("../models/cartItem");
const products = require("../models/products");

exports.addtocart = async (req, res, next) => {
  try {
    console.log(req.body.productId);
    await cartItem.create({
      userId: req.user,
      productId: req.body.productId,
    });
    const result = await products.findOne({
      where: {
        productId: req.body.productId,
      },
    });
    res.status(201).json({
      message: "Successfully Added to the Cart",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getcartitems = async (req, res, next) => {
  try {
    const cartItems = await cartItem.findAll({
      where: { userId: req.user },
    });

    const productIds = cartItems.map((item) => item.productId);

    const productslist = await products.findAll({
      where: {
        productId: productIds,
      },
    });
    res.status(201).json({
      message: "Cart Data from db",
      data: productslist,
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

exports.deletecartitems = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    await cartItem.destroy({
      where: { productId: itemId },
    });
    res.status(201).json({
      message: "Product removed from cart",
      data: itemId,
    });
  } catch (err) {
    console.log(err);
  }
};
