const express = require('express');
const bodyParser = require('body-parser');
const viewEngine = require('./config/viewEngine');
const uploadRouter = require('./routes/uploadRouter');
const adminRouter = require('./routes/loginAdminRouter');
const categoryRouter = require('./routes/theLoaiRouter');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const cron = require('node-cron');
const moment = require('moment');

require("dotenv").config();

let app = express();
let port = process.env.PORT || 6969;
const hostname = process.env.HOST_NAME;

connectDB();

// Cài đặt CORS
const allowedOrigins = [
    'http://localhost:3003', // Local development
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.options('*', cors()); // Enable preflight requests for all routes



// Config bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Đặt thư mục public/uploads làm public để có thể truy cập
app.use('/uploads', express.static(path.join(__dirname, './public/uploads')));


// Config app
viewEngine(app);

// Định nghĩa các route cho API
// danh cho login,register,logout admin
app.use("/api/accadmin", adminRouter);
// API The Loai
app.use("/api/category", categoryRouter);


// Sử dụng uploadRouter
app.use("/api/upload", uploadRouter); // Đặt đường dẫn cho upload


app.listen(port, () => {
    console.log("backend nodejs is running on the port:", port, `\n http://localhost:${port}`);
});
