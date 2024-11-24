const express = require("express");
import comment from '../controllers/Comments/comment.controller';
const router = express.Router();

// find all comment
router.get("/get-comment", comment.getComment );

// tao moi comment
router.post("/create-comment", comment.createComment );

// delete comment
router.delete("/delete-comment/:id", comment.deleteComment );

module.exports = router;