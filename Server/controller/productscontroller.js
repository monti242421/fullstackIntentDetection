const product = require("../models/products");
const handleQuery = require("../services/mistralService");
const getUnsplashImage = require("../services/unSplash");
const { faker } = require("@faker-js/faker");
const { Op } = require("sequelize"); // Make sure this is at the top

exports.productscontroller = async (req, res, next) => {
  try {
    const existingProducts = await product.count();
    if (existingProducts > 0) {
      const Products = await product.findAll({
        where: { isFeatured: false },
      });

      res.status(201).json({
        message: "Your Products",
        Products: Products,
      });
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

function normalizeQueryResult(obj) {
  try {
    if (Array.isArray(obj)) {
      if (obj == []) {
        return [
          {
            product_type: null,
            category: null,
            color: null,
            brand: null,
            budget: null,
          },
        ];
      }
      const list = [];
      for (let i = 0; i < 4; i++) {
        const parts = obj[i].split(",");
        list.push({
          product_type: cleanToNull(parts[0]) || null,
          category: cleanToNull(parts[1]) || null,
          brand: null,
          color: null,
          budget: null,
        });
      }
      return list;
    }
    function cleanToNull(value) {
      const cleaned = value
        .replace(/^['"]+|['"]+$/g, "")
        .trim()
        .toLowerCase();
      return cleaned === "null" ? null : cleaned;
    }

    if (typeof obj === "string") {
      if (obj == "") {
        return [
          {
            product_type: null,
            category: null,
            color: null,
            brand: null,
            budget: null,
          },
        ];
      }
      console.log("obj", obj);
      const item = obj.split(",");
      return [
        {
          product_type: cleanToNull(item[0].split(":")[1]) || null,
          category: cleanToNull(item[1].split(":")[1]) || null,
          brand: cleanToNull(item[2].split(":")[1]) || null,
          color: cleanToNull(item[3].split(":")[1]) || null,
          budget: cleanToNull(item[4].split(":")[1]) || null,
        },
      ];
    }
  } catch (error) {
    console.log(error);
    return [
      {
        product_type: null,
        category: null,
        color: null,
        brand: null,
        budget: null,
      },
    ];
  }
}

async function generateFakerProducts(finalList) {
  const totalProducts = 32;
  const countPerItem = Math.floor(totalProducts / finalList.length);
  const result = [];
  try {
    for (const product of finalList) {
      const imagefromUnsplash = await getUnsplashImage(product.product_type);
      // console.log(imagefromUnsplash);
      for (let i = 0; i < countPerItem; i++) {
        const original_price =
          faker.commerce.price({
            min: 0.5 * product.budget,
            max: product.budget,
          }) == 0
            ? faker.commerce.price({ min: 100, max: 50000 })
            : faker.commerce.price({
                min: 0.5 * product.budget,
                max: product.budget,
              });
        const discount_percentage = faker.number.int({ min: 5, max: 50 });
        result.push({
          item_name: product.product_type || faker.commerce.product(),
          category: product.category || faker.commerce.department(),
          image_Url:
            imagefromUnsplash ||
            faker.image.url({
              width: 640,
              height: 480,
              category: "product",
            }),
          company_name: product.brand || faker.company.name(),
          color: product.color || faker.color.human(),
          original_price: original_price,
          discount_percentage: discount_percentage,
          current_price: original_price * (1 - discount_percentage / 100),
          return_period: faker.number.int({ min: 7, max: 30 }),
          delivery_date: faker.date.soon({ days: 10 }),
          rating: parseFloat(
            faker.number.float({ min: 2, max: 5, fractionDigits: 1 })
          ),
          isFeatured: false,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }

  return result;
}
exports.searchcontroller = async (req, res, next) => {
  try {
    const userQuery = req.body.userQuery;
    // console.log(userQuery);
    const obj = await handleQuery(userQuery);
    const normalizedobject = normalizeQueryResult(obj);
    // console.log(normalizedobject);

    let whereClause = {};
    if (
      normalizedobject[0].product_type &&
      normalizedobject[0].product_type !== "null"
    ) {
      whereClause.item_name = normalizedobject[0].product_type;
    }
    if (
      normalizedobject[0].category &&
      normalizedobject[0].category !== "null"
    ) {
      whereClause.category = normalizedobject[0].category;
    }
    if (normalizedobject[0].brand && normalizedobject[0].brand !== "null") {
      whereClause.company_name = normalizedobject[0].brand;
    }
    if (normalizedobject[0].color && normalizedobject[0].color !== "null") {
      whereClause.color = normalizedobject[0].color;
    }
    if (normalizedobject[0].budget && normalizedobject[0].budget !== "null") {
      whereClause.original_price = {
        [Op.lte]: normalizedobject[0].budget, // <= budget
      };
    }
    // console.log(whereClause);

    const existingProducts = await product.findAll({ where: whereClause });
    // console.log(existingProducts.length);
    if (existingProducts.length >= 32) {
      // console.log("sending existing Products");
      res.status(201).json({
        message: "Sent Existing Products Succesfully",
        product_list: existingProducts,
        filters: normalizedobject,
      });
      return;
    }

    const product_list = await generateFakerProducts(normalizedobject);
    const result = await product.bulkCreate(product_list);
    res.status(201).json({
      message: "Sent New Products Succesfully",
      product_list: result,
      filters: normalizedobject,
    });
  } catch (err) {
    console.log(err);
  }
};
