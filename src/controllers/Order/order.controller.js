const Order = require('../../model/Order');
const Product = require('../../model/SanPham');  // Import model sản phẩm
const nodemailer = require('nodemailer');
require('dotenv').config();

// API tạo đơn hàng
const createOrder = async (req, res) => {
    try {
        const { lastName, firstName, email, address, phone, note,
            products, idKhachHang, thanhTien, soTienCanThanhToan, soTienGiamGia, giamGia, tongSoLuong
        } = req.body;

        console.log("lastName, firstName, email, address, phone, note: ", lastName, firstName, email, address, phone, note);
        console.log("products: ", products);
        console.log("idKhachHang: ", idKhachHang);
        console.log(" thanhTien, soTienCanThanhToan, soTienGiamGia, giamGia, tongSoLuong: ", thanhTien, soTienCanThanhToan, soTienGiamGia, giamGia, tongSoLuong); 
        
        // Hàm định dạng tiền tệ VND
        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(amount);
        }

        //---- GỬI XÁC NHẬN ĐƠN HÀNG VỀ EMAIL
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
            }
        });

        // Tạo bảng HTML để hiển thị thông tin đơn hàng
        let productsHtml = '';

        // Lặp qua các sản phẩm trong đơn hàng
        for (const product of products) {
            // Tìm sản phẩm trong cơ sở dữ liệu bằng _idSP
            const productDetails = await Product.findById(product._idSP).exec();

            // Kiểm tra nếu tìm thấy sản phẩm
            if (productDetails) {
                // Thêm thông tin sản phẩm vào bảng HTML
                productsHtml += `
                    <tr>
                        <td>${productDetails.TenSP}</td>  
                        <td>${product.size}</td>  
                        <td>${product.quantity}</td>  
                        <td>${formatCurrency(product.price)}</td>  <!-- Giá mỗi sản phẩm -->
                        <td>${formatCurrency(product.quantity * product.price)}</td>  <!-- Tổng tiền cho sản phẩm -->
                    </tr>
                `;
            }
        }

        const sendOrderConfirmationEmail = async (toEmail) => {
            // Tạo nội dung email với bảng sản phẩm
            const mailOptions = {
                from: 'Khắc Tú',
                to: toEmail,
                subject: 'Xác nhận đơn hàng của bạn.',
                html: `
                    <p style="color: navy; font-size: 20px;">Cảm ơn bạn <span style="color: black; font-weight: bold; font-style: italic;">${lastName} ${firstName}</span> đã đặt hàng!!</p>
                    <p style="color: green; font-style: italic;">Đơn hàng của bạn đã được xác nhận.</p>
                    <p>Tổng số lượng đặt: <span style="color: blue;">${tongSoLuong}</span> sản phẩm</p>
                    <p>Tổng tiền của ${tongSoLuong} sản phẩm: <span style="color: red;">${formatCurrency(thanhTien)}</span></p>
                    <p>Phí giao hàng: <span style="color: red;">0</span></p>
                    <p>Bạn được giảm ${giamGia}% cụ thể là: <span style="color: red;">-${formatCurrency(soTienGiamGia)}</span></p>
                    <p>Số tiền cần thanh toán: <span style="color: red;">${formatCurrency(soTienCanThanhToan)}</span></p>
                    <p>Số Điện Thoại Của Bạn ${firstName} ${lastName}: ${phone}</p>
                    <p>Địa chỉ nhận hàng: <span style="color: navy; font-style: italic;">${address}</span></p>
                    <br/>
                    <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                        <thead>
                            <tr>
                                <th style="text-align: left;">Tên sản phẩm</th>
                                <th style="text-align: left;">Cấu hình</th>
                                <th style="text-align: left;">Số lượng đặt</th>
                                <th style="text-align: left;">Đơn giá</th>
                                <th style="text-align: left;">Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productsHtml}
                        </tbody>
                    </table>
                    <p>Link Website của tôi: <a href="#">WebShop Khắc Tú</a></p>
                `
            };

            return new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        resolve();
                    }
                });
            });
        };


        
        // Kiểm tra số lượng tồn của từng size trong sản phẩm
        for (const item of products) {
            // Tìm sản phẩm trong database
            const product = await Product.findById(item._idSP);

            // Kiểm tra nếu sản phẩm không tồn tại
            if (!product) {
                return res.status(404).json({
                    message: `Sản phẩm với ID ${item._idSP} không tồn tại!`,
                });
            }

            // Tìm size sản phẩm trong mảng sizes
            const size = product.sizes.find(s => s.size === item.size);
            
            // Kiểm tra nếu size không tồn tại
            if (!size) {
                return res.status(400).json({
                    message: `Size ${item.size} của sản phẩm không hợp lệ!`,
                });
            }

            // Kiểm tra số lượng tồn có đủ hay không
            if (size.quantity < item.quantity) {
                return res.status(400).json({
                    message: `Sản phẩm ${product.TenSP} - cấu hình: ${item.size} chỉ còn ${size.quantity} sản phẩm trong kho, bạn không thể đặt ${item.quantity} sản phẩm!`,
                });
            }
        }

        // Tạo đơn hàng mới
        const newOrder = new Order({
            lastName, firstName, email, address, phone, note, products, soTienGiamGia, giamGia, soTienCanThanhToan, thanhTien, tongSoLuong, idKhachHang
        });

        // Lưu đơn hàng vào database
        await newOrder.save();

        // Gửi email thông báo đặt hàng thành công
        await sendOrderConfirmationEmail(email);

        // Cập nhật số lượng tồn kho và số lượng bán cho từng sản phẩm
        for (let product of products) {
            const { _idSP, size, quantity } = product;

            // Tìm sản phẩm theo _idSP
            const productData = await Product.findById(_idSP);

            if (productData) {
                console.log(`Found product: ${productData.TenSP}`);

                // Kiểm tra xem sản phẩm có kích thước (size) nào khớp với size đã đặt không
                let updated = false;

                // Duyệt qua các kích thước (sizes) của sản phẩm
                for (let sizeData of productData.sizes) {
                    if (sizeData.size === size) {
                        console.log(`Updating size ${sizeData.size} with quantity ${quantity}`);

                        // Giảm số lượng tồn kho của size đã đặt
                        if (sizeData.quantity >= quantity) {
                            sizeData.quantity -= quantity;
                            productData.SoLuongBan += quantity;
                            updated = true;
                            break; // Dừng vòng lặp khi đã tìm thấy size tương ứng
                        } else {
                            console.log(`Not enough stock for size ${sizeData.size}`);
                            return res.status(400).json({ message: `Không đủ số lượng cho size ${sizeData.size}` });
                        }
                    }
                }

                // Nếu đã cập nhật size thì tính lại tổng số lượng tồn kho của sản phẩm
                if (updated) {
                    // Cập nhật lại SoLuongTon (tổng số lượng tồn kho)
                    productData.SoLuongTon = productData.sizes.reduce((total, size) => total + size.quantity, 0);
                    console.log(`Updated stock for product: ${productData.TenSP}, new SoLuongTon: ${productData.SoLuongTon}`);

                    // Lưu lại thông tin sản phẩm đã cập nhật
                    await productData.save();
                }
            } else {
                console.log(`Product not found: ${productId}`);
            }
        }

        // Trả về thông tin đơn hàng đã tạo
        return res.status(201).json({
            message: 'Đặt hàng thành công!',
            data: newOrder,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi tạo đơn hàng!',
            error: error.message,
        });
    }
};

module.exports = { createOrder };
