const mongoose = require('mongoose');


const CatSchema = new mongoose.Schema({
    
    desc: { type: String, required: true, },
   

}, { timestamps: true })
 



const Cat = mongoose.model('Cat', CatSchema);
module.exports = Cat    