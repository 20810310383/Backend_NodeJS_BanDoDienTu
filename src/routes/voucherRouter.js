const express = require("express");
import voucher from '../controllers/Voucher_KhachHang/voucher.controller';
const router = express.Router();

// find all voucher
router.get("/get-voucher", voucher.getVoucher );

// tao moi voucher
router.post("/create-voucher", voucher.createVoucher );

// update voucher
router.put("/update-voucher", voucher.updateVoucher );

// delete voucher
router.delete("/delete-voucher/:id", voucher.deleteVoucher );

module.exports = router;