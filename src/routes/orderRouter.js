const express = require("express");
import order from '../controllers/Order/order.controller';
import orderHistory from '../controllers/Order/history.order.controller';
const router = express.Router();

// find all hang sx
router.post("/dat-hang", order.createOrder );

router.get("/find-all-order", orderHistory.historyOrderByIdKH)


module.exports = router;