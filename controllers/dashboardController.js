const authService = require("../services/authService");

/**
 * Render the authenticated dashboard page.
 */
const renderDashboard = (req, res) => {
  res.render("dashboard", {
    user: req.user,
    accessDenied: false,
    errorMessage: null,
    adminView: false,
    usersList: [],
    logs: [],
    rules: []
  });
};

/**
 * Render the special Admin management panel with full features.
 */
const renderAdminPanel = (req, res) => {
  const usersList = authService.getAllUsers();
  const logs = authService.getActivityLogs();
  const rules = authService.getRbacRules();

  res.render("dashboard", {
    user: req.user,
    accessDenied: false,
    errorMessage: null,
    adminView: true,
    usersList,
    logs,
    rules
  });
};

/**
 * Handle Admin action to change a user's role.
 */
const handleUpdateRole = (req, res) => {
  const { username, newRole } = req.body;
  authService.updateUserRole(username, newRole);
  res.redirect("/admin/panel");
};

module.exports = {
  renderDashboard,
  renderAdminPanel,
  handleUpdateRole
};
