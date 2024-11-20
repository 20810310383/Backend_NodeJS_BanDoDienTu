const express = require("express");
import loginKH from '../controllers/Login/login.kh.controller';
const router = express.Router();

// route đăng nhập kh
router.post("/login-kh", loginKH.loginAccKH );
// route register KH
router.post("/register-kh", loginKH.registerAccKH );
// route logout  KH
router.post("/logout-kh", loginKH.logoutKH );

module.exports = router;