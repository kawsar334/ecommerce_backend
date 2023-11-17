


const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true, 
    },
    text:{
        type:String,
        required:true
    },

}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message
