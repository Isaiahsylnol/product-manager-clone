const ProductRepository = require("../repositories/product.repository");
const ProductLocationRepository = require("../repositories/product_locations.repository");

const productRepository = new ProductRepository();
const productLocationRepository = new ProductLocationRepository();

async function getAllProducts(req, res) {
  try {
    const result = await productRepository.findAll();
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching products: ", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
}

async function getProductBySku(req, res) {
  const { sku } = req.params;

  try {
    const result = await productRepository.findBySku(sku);

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Error fetching product by SKU:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product." });
  }
}

async function getProductLocations(req, res) {
  const { sku } = req.params;

  try {
    const result = await productLocationRepository.getProductLocations(sku);

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Product locations not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching product's locations by SKU: ", err);
    res.status(500).json({
      error: "An error occurred while fetching the product's loations.",
    });
  }
}

module.exports = { getAllProducts, getProductBySku, getProductLocations };
