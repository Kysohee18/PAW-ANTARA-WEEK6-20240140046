/**
 * Logs the HTTP method and URL for every incoming request.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const logMiddleware = (req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
};

module.exports = logMiddleware;
