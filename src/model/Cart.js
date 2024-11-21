const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({

    cart: {
        items: [{
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'SanPham',
                required: true
            },
            donGia: {
                type: Number,
                required: true,
            },           
            quantity: {
                type: Number,
                required: true,
            },
            size: {
                type: String,               
            }
        }],
        totalQuantity: {
            type: Number,
            default: 0  // Set a default value
        },
        PhiShip: { type: Number, default: 30000 },
        GiamGia: { type: Number, default: 0 },
    },
    MaTKKH: { 
        ref: "AccKH", 
        type: mongoose.SchemaTypes.ObjectId 
    },
    
});
  

module.exports = mongoose.model('Cart', CartSchema);