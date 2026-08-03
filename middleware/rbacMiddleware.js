/**
 * Role-Based Access Control (RBAC) Middleware.
 * Restricts route access based on allowed user roles.
 *
 * @param {...string} allowedRoles - List of roles permitted to access the route.
 * @returns {Function} Express middleware function.
 */
const rbacMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.redirect("/login");
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).render("dashboard", {
        user: req.user,
        accessDenied: true,
        errorMessage: `Akses Ditolak! Role '${req.user.role}' tidak memiliki izin untuk halaman ini.`,
        adminView: false,
        usersList: [],
        logs: [],
        rules: []
      });
    }

    next();
  };
};

module.exports = rbacMiddleware;
