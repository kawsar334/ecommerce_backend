const mongoose =require("mongoose");
const jwt =require("jsonwebtoken");
const crypto =require("crypto");

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter yourName "],
        maxLength:[30, "Name can't exeed 30 character"],
        minLength:[4,"name shuld be more than 4 characktars "]
    },
    email:{
        type:String,
        required:[true, "Please enter Your email"],
        uniquie:true,
    },
    password:{
        type:String,
        required:[true,"please enter Your Password "],
        minLength:[6, "Password shuld be greater than 6 character "], 
    },
    avatar:{
            type:String,
            default:""

    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    notification:{
        type:[String],
        default:[]

    } ,
    seenNotification:{
        type:[String],
        default:[]
    },
    message:{
        type: [String],
        default: []
    },
},{timestamps:true});


module.exports =mongoose.model("User", userSchema);