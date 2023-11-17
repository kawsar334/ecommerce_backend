const mongoose = require('mongoose');
const { Schema } = mongoose;


const CartSchema = new mongoose.Schema({
    products:{
        type:Array,
        default:[]
    },
    userId:{
        type:String,
        required:true
    }
    
}, { timestamps: true })



const Cart = mongoose.model('Cart',CartSchema);
module.exports =Cart