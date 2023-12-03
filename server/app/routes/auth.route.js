const express = require("express");
const authController = require("../controllers/auth.controller");
const checkTokenExpiration = require('../middlewares/auth');
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token",checkTokenExpiration, authController.refreshToken);
router.get("/verifyToken",checkTokenExpiration, authController.verifyToken);

module.exports = router;
