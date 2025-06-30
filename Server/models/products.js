const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Products = sequelize.define("products", {
  productId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  image_Url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  company_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  item_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  original_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  current_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  discount_percentage: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  return_period: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  delivery_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isFeatured: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Products;
