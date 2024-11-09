const HangSX = require('../../model/HangSX');
const mongoose = require('mongoose');  // Đảm bảo bạn đã import mongoose
const { Types } = require('mongoose');  // Đảm bảo rằng bạn đã import Types từ mongoose
const LoaiSP = require('../../model/LoaiSP');
const { ObjectId } = mongoose.Types;

require('dotenv').config();

module.exports = {

    getHangSX: async (req, res) => {
        try {
            const { page, limit, TenHangSX } = req.query; 
    
            // Chuyển đổi thành số
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
    
            // Tính toán số bản ghi bỏ qua
            const skip = (pageNumber - 1) * limitNumber;
    
            // Tạo query tìm kiếm
            const query = {};
            if (TenHangSX) {
                const searchKeywords = (TenHangSX || '')
                const keywordsArray = searchKeywords.trim().split(/\s+/);
    
                const searchConditions = keywordsArray.map(keyword => ({
                    TenHangSX: { $regex: keyword, $options: 'i' } // Tìm kiếm không phân biệt chữ hoa chữ thường
                }));
    
                query.$or = searchConditions;
            }
    
            // Lấy toàn bộ dữ liệu mà không phân trang để nhóm
            let hangsx = await HangSX.find(query).populate('IdLoaiSP');
    
            // Nhóm các thể loại của mỗi hãng sản xuất thành một chuỗi
            const groupedHangSX = hangsx.reduce((result, hsx) => {
                const tenHangSX = hsx.TenHangSX;
                const _idHangSX = hsx._id;
                const loaiSP = hsx.IdLoaiSP ? hsx.IdLoaiSP.TenLoaiSP : 'No Categories';
                const _idLoai = hsx.IdLoaiSP ? hsx.IdLoaiSP._id : 'No Categories';
                console.log("_idLoai: ", _idLoai);
                
                
                // Kiểm tra xem TenHangSX đã tồn tại trong result chưa
                if (result[tenHangSX]) {
                    // Nếu tồn tại, thêm vào mảng IdLoaiSP của nhóm đó
                    result[tenHangSX].IdLoaiSP.push({ _id: _idLoai, TenLoaiSP: loaiSP });
                } else {
                    // Nếu chưa tồn tại, tạo một nhóm mới với TenHangSX và IdLoaiSP là một mảng
                    result[tenHangSX] = { _id: _idHangSX, TenHangSX: tenHangSX, IdLoaiSP: [{ _id: _idLoai, TenLoaiSP: loaiSP }] };
                }
                return result;
            }, {});
    
            // Chuyển đối tượng thành mảng để dễ xử lý hơn
            const finalGroupedHangSX = Object.values(groupedHangSX);
            console.log("finalGroupedHangSX: ",finalGroupedHangSX);
            
    
            // Tính tổng số nhóm
            const totalHangSXP = finalGroupedHangSX.length;
    
            // Tính số trang
            const totalPages = Math.ceil(totalHangSXP / limitNumber);
    
            // Áp dụng phân trang vào mảng nhóm
            const paginatedGroupedHangSX = finalGroupedHangSX.slice(skip, skip + limitNumber);
    
            if (finalGroupedHangSX) {
                return res.status(200).json({
                    message: "Đã tìm ra hãng sx",
                    errCode: 0,
                    data: paginatedGroupedHangSX,  // Trả về kết quả đã nhóm và phân trang
                    totalHangSXP,
                    totalPages,
                    currentPage: pageNumber,
                    finalGroupedHangSX
                });
            } else {
                return res.status(500).json({
                    message: "Tìm hãng sx thất bại!",
                    errCode: -1,
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Có lỗi xảy ra.",
                error: error.message,
            });
        }        
    },  
    
    createHangSX: async (req, res) => {
        try {
            let {TenHangSX, IdLoaiSP} = req.body  
            
            // Tạo đối tượng hangSX
            const hangSX = IdLoaiSP.map(idLoai => ({
                TenHangSX: TenHangSX,
                IdLoaiSP: idLoai
            }))
            console.log("hangSX: ", hangSX);

            let checkTenHangSX = await HangSX.findOne({
                TenHangSX: { $regex: new RegExp(`^${TenHangSX}$`, 'i') }  // Sử dụng $regex với tùy chọn 'i' để không phân biệt hoa thường
            })
            if(checkTenHangSX){
                return res.status(500).json({
                    message: "Trùng tên Hãng, Bạn không thể thêm mới!",                    
                    errCode: 0,
                })
            }

            let createHangSX = await HangSX.insertMany(hangSX)

            if(createHangSX){
                console.log("Inserted documents: ", createHangSX);
                return res.status(200).json({
                    message: "Bạn đã thêm hãng sản phẩm thành công!",
                    errCode: 0,
                    data: createHangSX
                })
            } else {
                return res.status(500).json({
                    message: "Bạn thêm hãng sản phẩm thất bại!",                
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
  
    updateHangSX: async (req, res) => {
        try {
            const { TenHangSX, IdLoaiSP } = req.body;
    
            //Xóa tất cả các tài liệu có TenHangSX = TenHangSX (loại bỏ các mục cũ)
            const deleteResult = await HangSX.deleteMany({ TenHangSX: TenHangSX });
            console.log("Số tài liệu bị xóa: ", deleteResult.deletedCount);
    
            // Thêm mới các tài liệu với TenHangSX là TenHangSX và IdLoaiSP mới
            for (let i = 0; i < IdLoaiSP.length; i++) {
                let newHangSX = new HangSX({
                    TenHangSX: TenHangSX, 
                    IdLoaiSP: IdLoaiSP[i]  // Mỗi IdLoaiSP mới cho từng tài liệu
                });
                await newHangSX.save();  // Lưu tài liệu mới vào database
            }
    
            // Trả về kết quả thành công
            return res.status(200).json({
                message: "Cập nhật và thêm mới loại sản phẩm thành công!"
            });
    
        } catch (error) {
            console.error("Lỗi khi cập nhật và thêm mới hãng sản phẩm:", error);
            return res.status(500).json({
                message: "Có lỗi xảy ra.",
                error: error.message
            });
        }
    },
    
    
    deleteHangSX: async (req, res) => {
        try {
            const nameHSX = req.params.nameHSX
            let xoaHangSX = await HangSX.deleteMany({TenHangSX: nameHSX})

            if(xoaHangSX) {
                return res.status(200).json({
                    data: xoaHangSX,
                    message: "Bạn đã xoá hãng sản phẩm thành công!"
                })
            } else {
                return res.status(500).json({
                    message: "Bạn đã xoá hãng sản phẩm thất bại!"
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