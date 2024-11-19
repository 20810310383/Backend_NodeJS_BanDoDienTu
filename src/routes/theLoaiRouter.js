const express = require("express");
import theLoai from '../controllers/TheLoai/theLoai.controller';
const router = express.Router();

// find all the loai
router.get("/get-the-loai", theLoai.getTheLoai );
router.get("/get-one-the-loai", theLoai.findOneCategory );

// tao moi the loai
router.post("/create-the-loai", theLoai.createTheLoai );

// update the loai
router.put("/update-the-loai", theLoai.updateTheLoai );

// delete the loai
router.delete("/delete-the-loai/:id", theLoai.deleteTheLoai );

module.exports = router;