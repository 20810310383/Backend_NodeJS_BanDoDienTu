const HangSX = require('../../model/HangSX');

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

            let hangsx = await HangSX.find(query).populate('IdLoaiSP').skip(skip).limit(limitNumber);

            console.log("hangsx: ", hangsx);
            

            const totalHangSXP = await HangSX.countDocuments(query); // Đếm tổng số chức vụ

            const totalPages = Math.ceil(totalHangSXP / limitNumber); // Tính số trang

            // // Nhóm các thể loại của mỗi hãng sản xuất thành một chuỗi
            // const groupedHangSX = hangsx.map(hsx => {
            //     console.log('IdLoaiSP:', hsx.IdLoaiSP);  // Kiểm tra xem IdLoaiSP có phải là mảng hay không
            //     const tenHangSX = hsx.TenHangSX;
            //     // const loaiSPList1 = hsx.IdLoaiSP ? hsx.IdLoaiSP.map(loai => loai.TenLoaiSP).join(', ') : 'No Categories';                                
            //     const loaiSPList = hsx.IdLoaiSP ? hsx.IdLoaiSP.TenLoaiSP : 'No Categories';                                
            //     return {
            //         TenHangSX: tenHangSX,
            //         IdLoaiSP: loaiSPList
            //     };
            // });
            // console.log("groupedHangSX: ", groupedHangSX);

            // Nhóm các thể loại của mỗi hãng sản xuất thành một chuỗi
            const groupedHangSX = hangsx.reduce((result, hsx) => {
                const tenHangSX = hsx.TenHangSX;
                const loaiSP = hsx.IdLoaiSP ? hsx.IdLoaiSP.TenLoaiSP : 'No Categories';
                
                // Kiểm tra xem TenHangSX đã tồn tại trong result chưa
                if (result[tenHangSX]) {
                    // Nếu tồn tại, thêm vào mảng loaiSP của nhóm đó
                    result[tenHangSX].IdLoaiSP.push(loaiSP);
                } else {
                    // Nếu chưa tồn tại, tạo một nhóm mới với TenHangSX và IdLoaiSP là một mảng
                    result[tenHangSX] = { TenHangSX: tenHangSX, IdLoaiSP: [loaiSP] };
                }
                return result;
            }, {});

            // Chuyển đổi đối tượng thành mảng để dễ xử lý hơn
            const finalGroupedHangSX = Object.values(groupedHangSX);

            console.log("groupedHangSX:", finalGroupedHangSX);
            

            if (groupedHangSX) {
                return res.status(200).json({
                    message: "Đã tìm ra hãng sx",
                    errCode: 0,
                    data: finalGroupedHangSX,  // Trả về kết quả đã nhóm
                    totalHangSXP,
                    totalPages,
                    currentPage: pageNumber,
                });
            } else {
                return res.status(500).json({
                    message: "Tìm hãng sx thất bại!",
                    errCode: -1,
                });
            }

            if(hangsx) {
                return res.status(200).json({
                    message: "Đã tìm ra hãng sx",
                    errCode: 0,
                    data: hangsx,
                    totalHangSXP,
                    totalPages,
                    currentPage: pageNumber,
                })
            } else {
                return res.status(500).json({
                    message: "Tìm hãng sx thất bại!",
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

    createHangSX: async (req, res) => {
        try {
            let {TenHangSX, IdLoaiSP} = req.body  
            
            // Tạo đối tượng hangSX
            const hangSX = IdLoaiSP.map(idLoai => ({
                TenHangSX: TenHangSX,
                IdLoaiSP: idLoai
            }))
            console.log("hangSX: ", hangSX);

            let checkTenHangSX = await HangSX.findOne({TenHangSX: TenHangSX})
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

    // chua xong
    updateHangSX: async (req, res) => {
        try {
            let {_id, TenHangSX, IdLoaiSP} = req.body

            let updateHangSX = await HangSX.updateOne({_id: _id},{TenHangSX, IdLoaiSP})

            if(updateHangSX) {
                return res.status(200).json({
                    data: updateHangSX,
                    message: "Chỉnh sửa hãng sản phẩm thành công"
                })
            } else {
                return res.status(404).json({                
                    message: "Chỉnh sửa hãng sản phẩm thất bại"
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