const mongoose = require('mongoose');  // Đảm bảo bạn đã import mongoose
const AccKH = require('../../model/AccKH');


require('dotenv').config();

module.exports = {

    getAccKH: async (req, res) => {
        try {
            const { page, limit, fullName } = req.query; 
    
            // Chuyển đổi thành số
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
    
            // Tính toán số bản ghi bỏ qua
            const skip = (pageNumber - 1) * limitNumber;
    
            // Tạo query tìm kiếm
            const query = {};
            if (fullName) {
                const searchKeywords = (fullName || '')
                const keywordsArray = searchKeywords.trim().split(/\s+/);
    
                const searchConditions = keywordsArray.map(keyword => ({
                    fullName: { $regex: keyword, $options: 'i' } // Tìm kiếm không phân biệt chữ hoa chữ thường
                }));
    
                query.$or = searchConditions;
            }
    
            let accKH = await AccKH.find(query).populate("IdVoucher").skip(skip).limit(limitNumber)

            const totalAccKH = await AccKH.countDocuments(query); // Đếm tổng số chức vụ

            const totalPages = Math.ceil(totalAccKH / limitNumber); // Tính số trang
                       
            if(accKH) {
                return res.status(200).json({
                    message: "Đã tìm ra acc kh",
                    errCode: 0,
                    data: accKH,
                    totalAccKH,
                    totalPages,
                    currentPage: pageNumber,
                })
            } else {
                return res.status(500).json({
                    message: "Tìm thể loại thất bại!",
                    errCode: -1,
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
  
    updateAccKH: async (req, res) => {
        try {
            const { id, fullName, IdVoucher } = req.body;
            console.log("id: ", id);
            console.log("fullname: ", fullName);
            console.log("IdVoucher: ", IdVoucher);                           
                
            const updateResult = await AccKH.updateOne(
                { _id: id }, // Điều kiện tìm kiếm tài liệu cần cập nhật
                { IdVoucher, fullName }
            );

            if(updateResult) {
                // Trả về kết quả thành công
                return res.status(200).json({
                    message: "Cập nhật Voucher cho khách hàng thành công!",
                    data: updateResult
                });
            } else {
                return res.status(404).json({                
                    message: "Chỉnh sửa thất bại"
                })
            }                    
        } catch (error) {
            console.error("Lỗi khi cập nhật Voucher cho khách hàng:", error);
            return res.status(500).json({
                message: "Có lỗi xảy ra.",
                error: error.message
            });
        }
    },
    
    deleteAccKH: async (req, res) => {
        try {
            const id = req.params.id
            let xoa = await AccKH.deleteOne({_id: id})

            if(xoa) {
                return res.status(200).json({
                    data: xoa,
                    message: "Bạn đã xóa tài khoản khách hàng thành công!"
                })
            } else {
                return res.status(500).json({
                    message: "Bạn đã xóa tài khoản khách hàng thất bại!"
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

    khoaAccKH: async (req, res) => {
        try {
            // const id = req.params.id
            const { id, isActive } = req.body;

            const updatedAccount = await AccKH.findByIdAndUpdate(id, { isActive }, { new: true });

            if (updatedAccount) {
                return res.status(200).json({ message: "Cập nhật thành công", data: updatedAccount });
            } else {
                return res.status(404).json({ message: "Tài khoản không tìm thấy" });
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