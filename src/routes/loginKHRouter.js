const express = require("express");
import loginKH from '../controllers/Login/login.kh.controller';
import accKH from '../controllers/Voucher_KhachHang/khachHang.controller';

const router = express.Router();

// route đăng nhập kh
router.post("/login-kh", loginKH.loginAccKH );
// route register KH
router.post("/register-kh", loginKH.registerAccKH );
// route logout  KH
router.post("/logout-kh", loginKH.logoutKH );

// find all acc kh
router.get("/get-kh", accKH.getAccKH );

// update acc kh
router.put("/update-kh", accKH.updateAccKH );

router.put("/khoa-kh", accKH.khoaAccKH );

// delete acc kh
router.delete("/delete-kh/:id", accKH.deleteAccKH );

module.exports = router;