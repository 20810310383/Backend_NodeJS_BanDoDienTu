const mongoose = require('mongoose');

const defaultVoucherId = new mongoose.Types.ObjectId("673f97124d3518d5ed8a1489");   // mặc định giảm 2%

const AccKH_Schema = new mongoose.Schema({   
        email: { type: String,  required: true },
        password: { type: String, required: true },
        fullName: { type: String, default: "Khắc tú"  },        
        address: { type: String },        
        phone: { type: String },        
        gender: { type: Boolean, default: true},        
        image: { type: String },  
        tokenAccess: { type: String },                                                
        IdVoucher: [{ref: "Voucher", type: mongoose.SchemaTypes.ObjectId, default: [defaultVoucherId]}],
        otp: { type: Number },  // Thêm trường lưu mã OTP
        otpExpires: { type: Date },  // Thêm trường lưu thời gian hết hạn mã OTP
        isActive: { type: Boolean, default: false},        // Trạng thái tài khoản
    },
    { 
        timestamps: true,   // createAt, updateAt
    }
);

module.exports = mongoose.model("AccKH", AccKH_Schema);