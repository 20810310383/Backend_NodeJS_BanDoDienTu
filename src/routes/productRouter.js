const express = require("express");
import product from '../controllers/Product/product.controller';
import { uploadExcel, uploadExcelFile } from '../controllers/Upload/upload.controller';
const router = express.Router();

// find all product
router.get("/get-product", product.getProducts );

// tao moi product
router.post("/create-product", product.createProduct );

// update product
router.put("/update-product", product.updateProduct );

// delete product
router.delete("/delete-product/:id", product.deleteProduct );

// Route import sản phẩm từ file Excel
// router.post('/import-products', uploadExcel.single('file'), product.importProductsFromExcel);

router.post('/upload-excel', uploadExcelFile);

// Route để upload file Excel
router.post('/import-products', uploadExcel, product.importProductsFromExcel); // Đảm bảo gọi middleware uploadExcel trước

// tìm sản phẩm thông qua idloaisp và bán trên 10 sp
router.get("/get-product-idloaisp-noibat", product.getProductToCategoryNoiBat );

module.exports = router;