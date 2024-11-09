const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete');

const HangSX_Schema = new mongoose.Schema(
    {
        TenHangSX: { type: String, required: false },
        IdLoaiSP: {ref: "LoaiSP", type: mongoose.SchemaTypes.ObjectId},
        // IdLoaiSP: { type: [String], required: true }, // Lưu trữ dưới dạng mảng các chuỗi

    },
    { 
        timestamps: true,   // createAt, updateAt
    },

);

// Override all methods
// HangSX_Schema.plugin(mongoose_delete, { overrideMethods: 'all' });

const HangSX = mongoose.model('HangSX', HangSX_Schema);

module.exports = HangSX;