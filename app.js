const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const logMiddleware = require("./middleware/logMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const rbacMiddleware = require("./middleware/rbacMiddleware");

const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const dashboardController = require("./controllers/dashboardController");

const productService = require("./services/productService");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logMiddleware);

app.get("/", productController.renderLanding);
app.get("/landing", productController.renderLanding);

app.get("/login", authController.renderLogin);
app.post("/login", authController.handleLogin);
app.get("/logout", authController.logout);

// Protected routes using authMiddleware and rbacMiddleware
app.get("/dashboard", authMiddleware, dashboardController.renderDashboard);

// Route khusus yang hanya bisa diakses oleh role 'admin'
app.get("/admin/panel", authMiddleware, rbacMiddleware("admin"), dashboardController.renderAdminPanel);
app.post("/admin/update-role", authMiddleware, rbacMiddleware("admin"), dashboardController.handleUpdateRole);

app.get("/api/products", async (req, res) => {
  try {
    const products = await productService.getProductsFromFile();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to load products" });
  }
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
