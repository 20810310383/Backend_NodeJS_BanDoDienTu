const Comments = require('../../model/Comments');

require('dotenv').config();

module.exports = {

    createComment: async (req, res) => {
        try {
            let {title, soSaoDanhGia, idKH, idSP} = req.body

            let create = await Comments.create({title, soSaoDanhGia, idKH, idSP})

            if(create){
                return res.status(200).json({
                    message: "Bình luận thành công!",
                    errCode: 0,
                    data: create
                })
            } else {
                return res.status(500).json({
                    message: "Bình luận thành công thất bại!",                
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

    getComment: async (req, res) => {
        try {

            let idSP = req.query.idSP
            let findComment = await Comments.find({idSP: idSP}).populate("idKH idSP")
            console.log("find: ", findComment);
            
            if(findComment){
                return res.status(200).json({
                    message: "Tìm Bình luận thành công!",
                    errCode: 0,
                    data: findComment
                })
            } else {
                return res.status(500).json({
                    message: "Tìm Bình luận thành công thất bại!",                
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

    deleteComment: async (req, res) => {
        try {
            let id = req.params.id
            console.log("id: ",id);
            
            let findComment = await Comments.deleteOne({_id: id})
            console.log("find: ", findComment);
            
            if(findComment){
                return res.status(200).json({
                    message: "Xóa Bình luận thành công!",
                    errCode: 0,
                    data: findComment
                })
            } else {
                return res.status(500).json({
                    message: "Xóa Bình luận thành công thất bại!",                
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
    }
}