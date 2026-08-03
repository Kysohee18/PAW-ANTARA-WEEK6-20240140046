const authService = require("../services/authService");

/**
 * Render the login page with no initial error.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const renderLogin = (req, res) => {
  res.render("login", { error: null });
};

/**
 * Handle user authentication submitted from the login form.
 *
 * @param {Object} req - Express request object containing the submitted credentials.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const handleLogin = (req, res) => {
  const { username, password } = req.body;
  const user = authService.loginUser(username, password);

  if (user) {
    // Store user JSON object or username in cookie
    res.cookie("auth_token", JSON.stringify({ username: user.username, role: user.role }), { httpOnly: true });
    res.redirect("/dashboard");
  } else {
    res.render("login", { error: "Username atau password salah bre" });
  }
};

/**
 * Clear the authentication cookie and redirect the user to the login page.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const logout = (req, res) => {
  res.clearCookie("auth_token");
  res.redirect("/login");
};

module.exports = {
  renderLogin,
  handleLogin,
  logout,
};
