const ProductRepository = require("../repositories/product.repository");

const productRepository = new ProductRepository();

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
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching product by SKU:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product." });
  }
}

module.exports = { getAllProducts, getProductBySku };
