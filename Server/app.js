const express = require("express");
const app = express();
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyparser = require("body-parser");
const sequelize = require("./util/database");
const user = require("./models/user");
const products = require("./models/products");
const cartItem = require("./models/cartItem");
const wishListItem = require("./models/wishlistItem");
const orders = require("./models/orders");

user.hasMany(cartItem, { foreignKey: "userId" });
cartItem.belongsTo(user, { foreignKey: "userId" });

products.hasMany(cartItem, { foreignKey: "productId" });
cartItem.belongsTo(products, { foreignKey: "productId" });

user.hasMany(wishListItem, { foreignKey: "userId" });
wishListItem.belongsTo(user, { foreignKey: "userId" });

products.hasMany(wishListItem, { foreignKey: "productId" });
wishListItem.belongsTo(products, { foreignKey: "productId" });

app.use(cors());
app.use(bodyparser.json({ extended: false }));
const userrouter = require("./routes/users");
const homerouter = require("./routes/Home");
const productsrouter = require("./routes/Products");
const cartrouter = require("./routes/cart");
const wishlistrouter = require("./routes/wishlist");
const ordersrouter = require("./routes/order");

app.use(userrouter);
app.use(homerouter);
app.use(productsrouter);
app.use(cartrouter);
app.use(wishlistrouter);
app.use(ordersrouter);

sequelize.sync();
// sequelize.sync({ force: true });
const PORT = process.env.PORT || 4000;
app.listen(PORT);
