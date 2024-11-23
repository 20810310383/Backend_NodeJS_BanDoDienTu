const express = require("express");
import order from '../controllers/Order/order.controller';
const router = express.Router();

// find all hang sx
router.post("/dat-hang", order.createOrder );


module.exports = router;