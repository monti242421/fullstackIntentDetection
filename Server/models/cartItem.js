const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const CartItem = sequelize.define("cartitem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = CartItem;
