const Order = require('../../model/Order');
const Product = require('../../model/SanPham');  // Import model sản phẩm
require('dotenv').config();

module.exports = {

    historyOrderByIdKH: async (req, res) => {
        try {

            const { page, limit, idKH } = req.query; 
    
            // Chuyển đổi thành số
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
    
            // Tính toán số bản ghi bỏ qua
            const skip = (pageNumber - 1) * limitNumber;

            let findOrder = await Order.find({ idKhachHang: idKH })
                .skip(skip)
                .limit(limitNumber)
                .populate({
                path: 'products._idSP', // Đường dẫn tới _idSP trong products
                model: 'SanPham',       // Model liên kết
                // select: 'name price',   // Chỉ lấy các trường cần thiết từ SanPham (nếu cần)
                }) 
                
            // Tính tổng 
            let totalOrder = await Order.countDocuments({ idKhachHang: idKH });
            let totalPage = Math.ceil(totalOrder / limitNumber)

            if(findOrder){
                return res.status(200).json({
                    message: "Tìm Order thành công!",
                    errCode: 0,
                    data: {
                        findOrder: findOrder,
                        totalOrder: totalOrder,  // Tổng số Order cho sản phẩm này
                        totalPages: totalPage,  // Tổng số trang
                        currentPage: pageNumber,  // Trang hiện tại
                    }
                })
            } else {
                return res.status(500).json({
                    message: "Tìm Order thành công thất bại!",                
                    errCode: -1,
                })
            } 
        } catch (error) {
            return res.status(500).json({
                message: 'Đã xảy ra lỗi!',
                error: error.message,
            });
        }
    }
}