const authService = require("../services/authService");

/**
 * Protects routes by checking for a valid authentication cookie and attaches req.user.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const authMiddleware = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const userData = JSON.parse(token);
    const user = authService.getUserByUsername(userData.username);
    if (!user) {
      res.clearCookie("auth_token");
      return res.redirect("/login");
    }
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("auth_token");
    return res.redirect("/login");
  }
};

module.exports = authMiddleware;
