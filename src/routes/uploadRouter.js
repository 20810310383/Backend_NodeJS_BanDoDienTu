// routes/uploadRoutes.js
const express = require('express');
import uploadFile from '../controllers/Upload/upload.controller';
const router = express.Router();

// Tạo route upload
router.post('/upload', uploadFile.uploadFile);
router.post('/multiple', uploadFile.uploadFiles);

module.exports = router;
