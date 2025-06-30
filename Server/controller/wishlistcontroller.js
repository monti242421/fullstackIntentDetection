const { where } = require("sequelize");
const wishlist = require("../models/wishlistItem");
const products = require("../models/products");

exports.addtowishlist = async (req, res, next) => {
  try {
    await wishlist.create({
      userId: req.user,
      productId: req.body.productId,
    });
    const result = await products.findOne({
      where: {
        productId: req.body.productId,
      },
    });
    res.status(201).json({
      message: "Successfully Added to the Wishlist",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getwishlist = async (req, res, next) => {
  try {
    const wishlistItems = await wishlist.findAll({
      where: { userId: req.user },
    });

    const productIds = wishlistItems.map((item) => item.productId);

    const productslist = await products.findAll({
      where: {
        productId: productIds,
      },
    });
    res.status(201).json({
      message: "Wishlist from db",
      data: productslist,
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

exports.deletefromwishlist = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    await wishlist.destroy({
      where: { productId: itemId },
    });
    res.status(201).json({
      message: "Product removed from Wishlist",
      data: itemId,
    });
  } catch (err) {
    console.log(err);
  }
};
