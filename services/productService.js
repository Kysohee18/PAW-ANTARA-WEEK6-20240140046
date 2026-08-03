const fs = require("fs");
const path = require("path");

const productDataPath = path.join(__dirname, "..", "data", "dataproduct.json");

/**
 * Read product data from the local JSON file.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of product objects.
 */
const getProductsFromFile = async () => {
  try {
    const data = await fs.promises.readFile(productDataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

/**
 * Fetch product data from the internal API endpoint.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of product objects.
 */
const fetchProductsFromAPI = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products from API");
    }
    return await response.json();
  } catch (error) {
    return [];
  }
};

module.exports = {
  getProductsFromFile,
  fetchProductsFromAPI,
};
