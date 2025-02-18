const LocationRepository = require("../repositories/location.repository");
const ProductLocationRepository = require("../repositories/product_locations.repository");

const locationRepository = new LocationRepository();
const productLocationRepository = new ProductLocationRepository();

async function getAllLocations(req, res) {
  try {
    const result = await locationRepository.findAll();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching locations." });
  }
}

async function getLocationByBunk(req, res) {
  const { code } = req.params;

  try {
    const result = await locationRepository.findByBunk(code);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the location." });
  }
}

async function getProductLocations(req, res) {
  const { sku } = req.params;

  try {
    const result = await productLocationRepository.getProductLocations(sku);

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Locations not found." });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Error fetching locations by product SKU:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the locations." });
  }
}

async function getLocationsProducts(req, res) {
  const { location_code } = req.params;
  console.log(location_code);
  try {
    const result = await productLocationRepository.getLocationsProducts(
      location_code
    );

    if (!result || result.length === 0) {
      return res
        .status(404)
        .json({ error: "Location's product(s) not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching location's product(s): ", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the locations." });
  }
}

async function removeProduct(req, res) {
  const { sku, location_id } = req.body;

  try {
    const result = await productLocationRepository.removeProduct(
      sku,
      location_id
    );

    if (!result[0] || result[0] === 0) {
      return res.status(404).json({
        error: `Product: ${sku} not found in location: ${location_id}.`,
      });
    }
    res.status(200).json(`${sku} removed from bunk: ${location_id}.`);
  } catch (err) {
    console.error("Error removing product from location: ", err);
    res
      .status(500)
      .json({
        error: "An error occurred while removing the product from location.",
      });
  }
}

module.exports = {
  removeProduct,
  getAllLocations,
  getLocationByBunk,
  getProductLocations,
  getLocationsProducts,
};
