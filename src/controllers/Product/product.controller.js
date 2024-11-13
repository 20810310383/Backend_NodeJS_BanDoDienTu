const SanPham = require('../../model/SanPham');

require('dotenv').config();

module.exports = {

    getProducts: async (req, res) => {
        try {
            const { page, limit, TenSP, sort, order, locTheoLoai, locTheoGia } = req.query; 

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
            // Tìm kiếm theo IdLoaiSP nếu có
            if (locTheoLoai) {
                // Chuyển 'locTheoLoai' từ string sang mảng ObjectId
                const locTheoLoaiArray = Array.isArray(locTheoLoai) ? locTheoLoai : JSON.parse(locTheoLoai);

                query.IdLoaiSP = { $in: locTheoLoaiArray }; // Dùng toán tử $in để lọc theo mảng các ObjectId
            }

            let sortOrder = 1; // tang dn
            if (order === 'desc') {
                sortOrder = -1; 
            }

            // lọc sản phẩm theo giá từ X đến Y
            console.log("locTheoGia: ", locTheoGia);
            if (locTheoGia) {
                let convert_string = locTheoGia.replace(/[^\d-]/g, '');
                let valuesArray = convert_string.split('-');
                let giatri1 = parseFloat(valuesArray[0]);
                let giatri2 = parseFloat(valuesArray[1]);
            
                // Lọc sản phẩm có giá trong sizes[0].price nằm trong khoảng giatri1 và giatri2
                if (convert_string) {
                    query.sizes = {
                        $elemMatch: {
                            price: { $gte: giatri1, $lte: giatri2 }
                        }
                    };
                }
            }
           
            console.log("sortOrder: ", sortOrder);
            console.log("locTheoLoai: ", locTheoLoai);            
            
            let sp = await SanPham.find(query)
                .populate("IdHangSX IdLoaiSP")
                .skip(skip)
                .limit(limitNumber)
                .sort({ [sort]: sortOrder })

            // Sắp xếp mảng sizes theo price từ thấp đến cao
            sp = sp.map(product => {
                // Sort sizes array based on price (ascending)
                if (product.sizes && product.sizes.length > 0) {
                    product.sizes.sort((a, b) => a.price - b.price); // Sort sizes array by price
                }
                return product;
            });

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

    updateProduct: async (req, res) => {
        try {
            let {_id, TenSP, IdHangSX, IdLoaiSP, sizes, Image, ImageSlider, MoTa, MoTaChiTiet, GiamGiaSP} = req.body

            let updateTL = await SanPham.updateOne({_id: _id},{TenSP, IdHangSX, IdLoaiSP, sizes, Image, ImageSlider, MoTa, MoTaChiTiet, GiamGiaSP})

            if(updateTL) {
                return res.status(200).json({
                    data: updateTL,
                    message: "Chỉnh sửa sản phẩm thành công"
                })
            } else {
                return res.status(404).json({                
                    message: "Chỉnh sửa sản phẩm thất bại"
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

    deleteProduct: async (req, res) => {
        try {
            const _id = req.params.id
            let xoaTL = await SanPham.deleteOne({_id: _id})

            if(xoaTL) {
                return res.status(200).json({
                    data: xoaTL,
                    message: "Bạn đã xoá sản phẩm thành công!"
                })
            } else {
                return res.status(500).json({
                    message: "Bạn đã xoá sản phẩm thất bại!"
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