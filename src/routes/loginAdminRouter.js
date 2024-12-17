const express = require("express");
import loginAdmin from '../controllers/Login/login.admin.controller';
import nhanVien from '../controllers/NhanVien/nhanVien.controller';
const router = express.Router();

// route đăng nhập admin
router.post("/login-admin", loginAdmin.loginAccAdmin );
// route register admin
router.post("/register-admin", loginAdmin.registerAccAdmin );
// route logout  admin
router.post("/logout-admin", loginAdmin.logoutAdmin );

router.get("/get-admin", nhanVien.getAccAdmin );

router.put("/update-admin", nhanVien.updateAccAdmin );

router.put("/khoa-admin", nhanVien.khoaAccAdmin );

router.delete("/delete-admin/:id", nhanVien.deleteAccAdmin );

router.get("/get-role", nhanVien.getRole );

module.exports = router;