const { where } = require("sequelize");
const orders = require("../models/orders");

exports.placeorder = async (req, res, next) => {
  try {
    console.log(req.body);
    await orders.create({
      userId: req.user,
      date: req.body.data.date,
      total_price: req.body.data.totalPrice,
      status: req.body.data.status,
      details: req.body.data.details,
    });
    res.status(201).json({
      message: "Order Placed Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getorders = async (req, res, next) => {
  try {
    const yourorders = await orders.findAll({
      where: { userId: req.user },
    });
    res.status(201).json({
      message: "Your Previous Orders",
      data: yourorders,
    });
    return;
  } catch (err) {
    console.log(err);
  }
};
