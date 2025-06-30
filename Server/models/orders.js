const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Orders = sequelize.define("order", {
  orderId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  total_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  details: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Orders;
