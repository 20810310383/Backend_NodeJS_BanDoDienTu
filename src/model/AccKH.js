const mongoose = require('mongoose');

const AccKH_Schema = new mongoose.Schema({   
        email: { type: String,  required: true },
        password: { type: String, required: true },
        fullName: { type: String, default: "Khắc tú"  },        
        address: { type: String },        
        phone: { type: String },        
        gender: { type: Boolean, default: true},        
        image: { type: String },  
        tokenAccess: { type: String },                                                
        isActive: { type: Boolean, default: false},        
    },
    { 
        timestamps: true,   // createAt, updateAt
    }
);
module.exports = mongoose.model("AccKH", AccKH_Schema);