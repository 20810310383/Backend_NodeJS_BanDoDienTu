const LoaiSP = require('../../model/LoaiSP');

require('dotenv').config();

module.exports = {

    getTheLoai: async (req, res) => {
        try {
            const { page, limit, TenLoaiSP } = req.query; 

            // Chuyển đổi thành số
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);

            // Tính toán số bản ghi bỏ qua
            const skip = (pageNumber - 1) * limitNumber;

            // Tạo query tìm kiếm
            const query = {};
            if (TenLoaiSP) {
                const searchKeywords = (TenLoaiSP || '')
                const keywordsArray = searchKeywords.trim().split(/\s+/);

                const searchConditions = keywordsArray.map(keyword => ({
                    TenLoaiSP: { $regex: keyword, $options: 'i' } // Tìm kiếm không phân biệt chữ hoa chữ thường
                }));

                query.$or = searchConditions;
            }

            let loaisp = await LoaiSP.find(query).skip(skip).limit(limitNumber);

            const totalLoaiSP = await LoaiSP.countDocuments(query); // Đếm tổng số chức vụ

            const totalPages = Math.ceil(totalLoaiSP / limitNumber); // Tính số trang

            if(loaisp) {
                return res.status(200).json({
                    message: "Đã tìm ra thể loại",
                    errCode: 0,
                    data: loaisp,
                    totalLoaiSP,
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

    createTheLoai: async (req, res) => {
        try {
            let {TenLoaiSP, Icon} = req.body            

            let checkTenTL = await LoaiSP.findOne({TenLoaiSP: TenLoaiSP})
            if(checkTenTL){
                return res.status(200).json({
                    message: "Trùng tên thể loại, Bạn không thể thêm mới!",                
                })
            }

            let createTL = await LoaiSP.create({TenLoaiSP, Icon})

            if(createTL){
                return res.status(200).json({
                    message: "Bạn đã thêm loại sản phẩm thành công!",
                    errCode: 0,
                    data: createTL
                })
            } else {
                return res.status(500).json({
                    message: "Bạn thêm loại sản phẩm thất bại!",                
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

    updateTheLoai: async (req, res) => {
        try {
            let {_id, TenLoaiSP, Icon} = req.body

            let updateTL = await LoaiSP.updateOne({_id: _id},{TenLoaiSP, Icon})

            if(updateTL) {
                return res.status(200).json({
                    data: updateTL,
                    message: "Chỉnh sửa Thể loại thành công"
                })
            } else {
                return res.status(404).json({                
                    message: "Chỉnh sửa Thể loại thất bại"
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

    deleteTheLoai: async (req, res) => {
        try {
            const _id = req.params.id
            let xoaTL = await LoaiSP.deleteOne({_id: _id})

            if(xoaTL) {
                return res.status(200).json({
                    data: xoaTL,
                    message: "Bạn đã xoá Thể loại thành công!"
                })
            } else {
                return res.status(500).json({
                    message: "Bạn đã xoá Thể loại thất bại!"
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