const express = require("express");
import hangSX from '../controllers/HangSX/hangSX.controller';
const router = express.Router();

// find all hang sx
router.get("/get-hang-sx", hangSX.getHangSX );

// tao moi hang sx
router.post("/create-hang-sx", hangSX.createHangSX );

// update hang sx
router.put("/update-hang-sx", hangSX.updateHangSX );

// delete hang sx
router.delete("/delete-hang-sx/:nameHSX", hangSX.deleteHangSX );

module.exports = router;