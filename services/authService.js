/**
 * Dummy user database containing usernames, passwords, and their assigned roles.
 */
let users = [
  {
    username: "admin",
    password: "12345678",
    name: "Administrator Utama",
    role: "admin",
    createdAt: "2026-08-01 09:00"
  },
  {
    username: "user",
    password: "12345678",
    name: "Pengguna Biasa",
    role: "user",
    createdAt: "2026-08-02 14:30"
  },
  {
    username: "budi",
    password: "12345678",
    name: "Budi Santoso",
    role: "user",
    createdAt: "2026-08-03 10:15"
  }
];

/**
 * System activity logs for RBAC inspection.
 */
const activityLogs = [
  { timestamp: "2026-08-03 10:00:12", user: "admin", action: "LOGIN", status: "SUCCESS", detail: "Berhasil masuk sistem" },
  { timestamp: "2026-08-03 10:15:45", user: "budi", action: "LOGIN", status: "SUCCESS", detail: "Berhasil masuk sistem" },
  { timestamp: "2026-08-03 11:20:05", user: "user", action: "ACCESS_ROUTE", status: "DENIED", detail: "Mencoba mengakses /admin/panel (403 Forbidden)" },
  { timestamp: "2026-08-03 12:40:00", user: "admin", action: "ACCESS_ROUTE", status: "GRANTED", detail: "Mengakses /admin/panel" }
];

/**
 * RBAC Route Access Rules.
 */
const rbacRules = [
  { route: "/", roles: ["guest", "user", "admin"], description: "Halaman landing umum" },
  { route: "/login", roles: ["guest"], description: "Halaman autentikasi login" },
  { route: "/dashboard", roles: ["user", "admin"], description: "Dashboard utama terpola" },
  { route: "/admin/panel", roles: ["admin"], description: "Panel manajemen sensitif khusus admin" },
  { route: "/api/products", roles: ["user", "admin"], description: "API Data Produk" }
];

const loginUser = (username, password) => {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return null;
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const getUserByUsername = (username) => {
  const user = users.find(u => u.username === username);
  if (!user) return null;
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const getAllUsers = () => {
  return users.map(({ password: _, ...u }) => u);
};

const updateUserRole = (username, newRole) => {
  const user = users.find(u => u.username === username);
  if (user) {
    user.role = newRole;
    activityLogs.unshift({
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: "admin",
      action: "UPDATE_ROLE",
      status: "SUCCESS",
      detail: "Mengubah role user '" + username + "' menjadi '" + newRole + "'"
    });
    return true;
  }
  return false;
};

const getActivityLogs = () => activityLogs;
const getRbacRules = () => rbacRules;

module.exports = {
  loginUser,
  getUserByUsername,
  getAllUsers,
  updateUserRole,
  getActivityLogs,
  getRbacRules
};
