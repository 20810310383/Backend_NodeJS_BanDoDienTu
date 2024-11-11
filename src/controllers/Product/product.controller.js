const SanPham = require('../../model/SanPham');

require('dotenv').config();

module.exports = {

    getProducts: async (req, res) => {
        try {
            const { page, limit, TenSP, sort, order } = req.query; 

            // Chuyển đổi thành số
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);

            // Tính toán số bản ghi bỏ qua
            const skip = (pageNumber - 1) * limitNumber;

            // Tạo query tìm kiếm
            const query = {};
            if (TenSP) {
                const searchKeywords = (TenSP || '')
                const keywordsArray = searchKeywords.trim().split(/\s+/);

                const searchConditions = keywordsArray.map(keyword => ({
                    TenSP: { $regex: keyword, $options: 'i' } // Tìm kiếm không phân biệt chữ hoa chữ thường
                }));

                query.$or = searchConditions;
            }

            let sortOrder = 1; // tang dn
            if (order === 'desc') {
                sortOrder = -1; 
            }
            console.log("sortOrder: ", sortOrder);
            


            let sp = await SanPham.find(query)
                .populate("IdHangSX IdLoaiSP")
                .skip(skip)
                .limit(limitNumber)
                .sort({ [sort]: sortOrder })

            const totalSanPham = await SanPham.countDocuments(query); // Đếm tổng số chức vụ

            const totalPages = Math.ceil(totalSanPham / limitNumber); // Tính số trang

            if(sp) {
                return res.status(200).json({
                    message: "Đã tìm ra products",
                    errCode: 0,
                    data: sp,
                    totalSanPham,
                    totalPages,
                    currentPage: pageNumber,
                })
            } else {
                return res.status(500).json({
                    message: "Tìm products thất bại!",
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

    createProduct: async (req, res) => {
        try {
            let {TenSP, GiamGiaSP, MoTa, MoTaChiTiet, ImageSlider, Image, IdHangSX, IdLoaiSP, sizes} = req.body     
            
            console.log("TenSP: ", TenSP);
            console.log("GiamGiaSP: ", GiamGiaSP);
            console.log("MoTa: ", MoTa);
            console.log("MoTaChiTiet: ", MoTaChiTiet);
            console.log("ImageSlider: ", ImageSlider);
            console.log("Image: ", Image);
            console.log("IdHangSX: ", IdHangSX);
            console.log("IdLoaiSP: ", IdLoaiSP);
            console.log("sizes: ", sizes);
            

            let createSP = await SanPham.create({TenSP, GiamGiaSP, MoTa, MoTaChiTiet, ImageSlider, Image, IdHangSX, IdLoaiSP, sizes})

            if(createSP){
                return res.status(200).json({
                    message: "Bạn đã thêm sản phẩm thành công!",
                    errCode: 0,
                    data: createSP
                })
            } else {
                return res.status(500).json({
                    message: "Bạn thêm sản phẩm thất bại!",                
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
}