const express = require("express");
const authRoute = require("./auth.route");
const salaryRoute = require("./salary.route")
const budgetRoute = require("./budget.route")
const expensesRoute = require("./expense.route")
const categoryRoute = require("./category.route")
const defaultBudgetRoute = require('./defaultBudget.routes')
const dashboardRoute = require('./dashboard')
const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/salary",
    route: salaryRoute,
  },
  {
    path: "/budget",
    route: budgetRoute,
  },
  {
    path: "/expenses",
    route: expensesRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/defaultBudget",
    route: defaultBudgetRoute
  },
  {
    path: "/dashboard",
    route: dashboardRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
