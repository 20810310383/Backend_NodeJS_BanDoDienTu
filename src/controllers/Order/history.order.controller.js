const Order = require('../../model/Order');
const Product = require('../../model/SanPham');  // Import model sản phẩm
require('dotenv').config();

module.exports = {

    historyOrderByIdKH: async (req, res) => {
        try {

            const { page, limit, idKH, sort, order } = req.query; 
    
            // Chuyển đổi thành số
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
    
            // Tính toán số bản ghi bỏ qua
            const skip = (pageNumber - 1) * limitNumber;

            // tang/giam
            let sortOrder = 1; // tang dn
            if (order === 'desc') {
                sortOrder = -1; 
            }

            let findOrder = await Order.find({ idKhachHang: idKH })
                .skip(skip)
                .limit(limitNumber)
                .populate({
                path: 'products._idSP', // Đường dẫn tới _idSP trong products
                model: 'SanPham',       // Model liên kết
                // select: 'name price',   // Chỉ lấy các trường cần thiết từ SanPham (nếu cần)
                }) 
                .sort({ [sort]: sortOrder })
                
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
                    message: "Tìm Order thất bại!",                
                    errCode: -1,
                })
            } 
        } catch (error) {
            return res.status(500).json({
                message: 'Đã xảy ra lỗi!',
                error: error.message,
            });
        }
    },

    handleHuyOrder: async (req, res) => {
        try {
            let id = req.query.idOrder

            let checkOrder = await Order.findById({_id: id})

            if (!checkOrder) {
                return res.status(404).json({
                    message: "Đơn hàng không tồn tại!",
                    errCode: -1,
                });
            }

            if (checkOrder && checkOrder.TinhTrangThanhToan === 'Đã Thanh Toán') {
                // Nếu TinhTrangThanhToan đang là "Đã thanh toán", tiến hành cập nhật
                let updateOrder = await Order.updateOne(
                    { _id: id },
                    { TinhTrangThanhToan: 'Chờ hoàn tiền', TrangThaiHuyDon: 'Đã Hủy' }
                )
                if(updateOrder){
                    return res.status(200).json({
                        message: "Hủy đơn hàng thành công!",
                        errCode: 0,
                        data: updateOrder
                    })
                } else {
                    return res.status(500).json({
                        message: "Hủy đơn hàng thất bại!",                
                        errCode: -1,
                    })
                } 
            } else {
                // Nếu không phải là "Đã thanh toán", không cập nhật
                let updateOrder = await Order.updateOne(
                    { _id: id },
                    { TrangThaiHuyDon: 'Đã Hủy' }
                );
                if(updateOrder){
                    return res.status(200).json({
                        message: "Hủy đơn hàng thành công!",
                        errCode: 0,
                        data: updateOrder
                    })
                } else {
                    return res.status(500).json({
                        message: "Hủy đơn hàng thất bại!",                
                        errCode: -1,
                    })
                } 
            }          
        } catch (error) {
            return res.status(500).json({
                message: 'Đã xảy ra lỗi!',
                error: error.message,
            });
        }
    },

    historyOrderAll: async (req, res) => {
        try {

            const { page, limit, sort, order, tenKH } = req.query; 
    
            // Chuyển đổi thành số
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
    
            // Tính toán số bản ghi bỏ qua
            const skip = (pageNumber - 1) * limitNumber;

            // tang/giam
            let sortOrder = 1; // tang dn
            if (order === 'desc') {
                sortOrder = -1; 
            }

            // Tạo query tìm kiếm
            const query = {};
            if (tenKH) {
                const searchKeywords = tenKH.trim().split(/\s+/).map(keyword => {
                    const normalizedKeyword = keyword.toLowerCase();  // Chuyển tất cả về chữ thường để không phân biệt
                    return {
                        $or: [
                            { firstName: { $regex: normalizedKeyword, $options: 'i' } },  
                            { lastName: { $regex: normalizedKeyword, $options: 'i' } },     
                            { phone: { $regex: normalizedKeyword, $options: 'i' } },     
                            { address: { $regex: normalizedKeyword, $options: 'i' } },     
                        ]
                    };
                }).flat();  // flat() để biến các mảng lồng vào thành một mảng phẳng
            
                query.$and = searchKeywords;  // Dùng $and để tìm tất cả các từ khóa
            }

            let findOrder = await Order.find(query)
                .skip(skip)
                .limit(limitNumber)
                .populate({
                path: 'products._idSP', // Đường dẫn tới _idSP trong products
                model: 'SanPham',       // Model liên kết
                }) 
                .sort({ [sort]: sortOrder })
                
            // Tính tổng 
            let totalDH = await Order.countDocuments(query);
            let totalPage = Math.ceil(totalDH / limitNumber)

            if(findOrder){
                return res.status(200).json({
                    message: "Tìm Order thành công!",
                    errCode: 0,
                    data: {
                        findOrder: findOrder,
                        totalDH: totalDH,  // Tổng số Order
                        totalPages: totalPage,  // Tổng số trang
                        currentPage: pageNumber,  // Trang hiện tại
                    }
                })
            } else {
                return res.status(500).json({
                    message: "Tìm Order thất bại!",                
                    errCode: -1,
                })
            } 
        } catch (error) {
            return res.status(500).json({
                message: 'Đã xảy ra lỗi!',
                error: error.message,
            });
        }
    },

    deleteHistoryOrder: async (req, res) => {
        try {
            const _id = req.params.id
            let xoaTL = await Order.deleteOne({_id: _id})

            if(xoaTL) {
                return res.status(200).json({
                    data: xoaTL,
                    message: "Bạn đã xoá đơn hàng này thành công!"
                })
            } else {
                return res.status(500).json({
                    message: "Bạn đã xoá đơn hàng này thất bại!"
                })
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Có lỗi xảy ra.",
                error: error.message,
            });
        }
    },
}