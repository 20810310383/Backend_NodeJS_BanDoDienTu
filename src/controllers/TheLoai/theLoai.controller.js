const LoaiSP = require('../../model/LoaiSP');

require('dotenv').config();

module.exports = {

    getTheLoai: async (req, res) => {
        try {
            let loaisp = await LoaiSP.find({})

            if(loaisp) {
                return res.status(200).json({
                    message: "Đã tìm ra thể loại",
                    errCode: 0,
                    data: loaisp
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

            if (!TenLoaiSP || !Icon ) {
                return res.status(400).json({
                    message: "Vui lòng cung cấp đầy đủ thông tin!"
                });
            }

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

            let updateTL = await TheLoai.updateOne({_id: _id},{TenLoaiSP, Icon})

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
            let xoaTL = await TheLoai.deleteOne({_id: _id})

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