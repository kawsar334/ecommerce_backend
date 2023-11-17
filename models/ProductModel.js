const mongoose = require('mongoose');
const { Schema } = mongoose;


const productSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, min: [1, 'wrong min price'], max: [10000, 'wrong max price'] },
    rating: { type: Number, min: [0, 'wrong min rating'], max: [5, 'wrong max price'], default: 0 },
    stock: { type: Number, min: [0, 'wrong min stock'], default: 0 },
    brand: { type: String, required: true },
    category: { type: [String], required: true },
    images: { type: [String], required: true },
    colors: { type: [String] },
    sizes: { type: [String] },
    
},{timestamps:true})




const Product =mongoose.model('Product', productSchema);
module.exports = Product