const express = require("express");
import { verifyGoogleToken } from '../controllers/Login/login.google.controller';
import loginKH from '../controllers/Login/login.kh.controller';
import { quenMatKhauKH } from '../controllers/Login/quen.mat.khau.controller';
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

router.get("/get-one-kh", accKH.getOneAccKH );

// update acc kh
router.put("/update-kh", accKH.updateAccKH );

router.put("/khoa-kh", accKH.khoaAccKH );

// delete acc kh
router.delete("/delete-kh/:id", accKH.deleteAccKH );

// router.post("/auth/google", verifyGoogleToken );

// quên mật khẩu
router.post("/quen-mat-khau", quenMatKhauKH)

module.exports = router;