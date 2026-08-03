const productService = require("../services/productService");

/**
 * Render the landing page with product data retrieved from the service layer.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const renderLanding = async (req, res) => {
  const products = await productService.fetchProductsFromAPI();
  res.render("landing", { products });
};

module.exports = {
  renderLanding,
};
