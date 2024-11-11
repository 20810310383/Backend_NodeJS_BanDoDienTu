const express = require("express");
import product from '../controllers/Product/product.controller';
const router = express.Router();

// find all product
router.get("/get-product", product.getProducts );

// tao moi product
router.post("/create-product", product.createProduct );

// update product
// router.put("/update-product", product.updateProduct );

// delete product
router.delete("/delete-product/:id", product.deleteProduct );

module.exports = router;