const { Faker, en } = require("@faker-js/faker");
const product = require("../models/products");

const faker = new Faker({ locale: [en] });

function generateFakeProducts(isFeatured = false) {
  const original_price = parseFloat(
    faker.commerce.price({ min: 20, max: 2000, dec: 2 })
  );
  const discount_percentage = faker.number.int({ min: 5, max: 50 });

  const fake_product = {
    company_name: faker.company.name(),
    item_name: faker.commerce.productName(),
    image_Url: faker.image.url({
      width: 640,
      height: 480,
      category: "product",
    }),
    category: product.category || faker.commerce.department(),
    color: product.color || faker.color.human(),
    original_price: original_price,
    discount_percentage: discount_percentage,
    current_price: original_price * (1 - discount_percentage / 100),
    return_period: faker.number.int({ min: 7, max: 30 }),
    delivery_date: faker.date.soon({ days: 10 }),
    rating: parseFloat(
      faker.number.float({ min: 2, max: 5, fractionDigits: 1 })
    ),
    isFeatured: isFeatured,
  };

  return fake_product;
}

exports.homecontroller = async (req, res, next) => {
  try {
    const existingProducts = await product.count();
    if (existingProducts > 0) {
      const feturedProducts = await product.findAll({
        where: { isFeatured: true },
      });

      res.status(201).json({
        message: "Existing Featured Products",
        feturedProducts: feturedProducts,
      });
      return;
    }
    const products = [];
    for (let i = 0; i < 8; i++) {
      products.push(generateFakeProducts(true));
    }
    for (let i = 0; i < 52; i++) {
      products.push(generateFakeProducts(false));
    }
    const result = await product.bulkCreate(products);
    const feturedProducts = await product.findAll({
      where: { isFeatured: true },
    });
    res.status(201).json({
      message: "new featured products",
      message: "Existing Featured Products",
      feturedProducts: feturedProducts,
    });
  } catch (err) {
    console.log(err);
  }
};
