const express = require("express");
import order, { createOrder } from '../controllers/Order/order.controller';
import orderHistory, { deleteHistoryOrder, doanhThu, handleHuyOrder, historyOrderAll, historyOrderByIdKH, updateOrder } from '../controllers/Order/history.order.controller';
const router = express.Router();

// find all hang sx
router.post("/dat-hang", createOrder );

router.get("/find-all-order", historyOrderByIdKH)

router.get("/find-all-history-order", historyOrderAll)

router.post("/huy-order", handleHuyOrder );

router.delete("/delete-history-order/:id", deleteHistoryOrder );

router.put("/update-order", updateOrder );

router.get("/sales-by-month", doanhThu );

module.exports = router;