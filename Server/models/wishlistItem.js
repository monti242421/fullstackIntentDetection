const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const wishListItem = sequelize.define("wishListitem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = wishListItem;
