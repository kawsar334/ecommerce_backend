const User = require("../models/User");
const createError = require("../utils/error");
const sendToken = require("../utils/jwtToken");
const sendEmail= require("../utils/sendEmail")


//Register a user 
exports.register=async(req, res, next)=>{

    const {name, email, password, }=req.body ;
    try{
        const user = await User.create({
            name, email, password, 
            avatar:{
                public_id:"this is a sample id",
                url:"profilepicurl///",

            }
        });
        sendToken(user, 200, res);


    }catch(err){
        next(err);
    }
};


//LOGIN USER
exports.login =async(req, res, next)=>{
    const {email, password} =req.body;
    
    try{
        if(!email || !password){
          return  createError(500, "please Enter Email and password !")
        }
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return next(createError(500, "Invalid  Email or password !"))
        }
        const isPasswordMatched = user.comparePassword(password);
        if(!isPasswordMatched){

            createError(500, "Invalid  Email or password !");

        }else{

           sendToken(user,200, res);

        }


    }catch(err){
        console.log(err)
        next(err);
    }
}

//get  a user 

exports.getUserDetails=async(req, res, next)=>{
    try{
        const user =await User.findById(req.params.id);
        if(!user){
            next(createError(404, "user Not found"))
        }else{
            res.status(200).json({
                success:true,
                user,

            })
        }

    }catch(err){
        next(err);
    }
}
//update user
exports.updateUserDetails=async(req, res, next)=>{
    try{
        
        
        const userData = {
            name:req.body.name,
            email:req.body.email,
        }
        
        const user =await User.findByIdAndUpdate(req.user.id. userData, {new:true});
        res.status(200).json({
            user,
            success:true,

        })

    }catch(err){
        next(err);
    }
} 
//delete user 
exports.deleteUser=async(req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user deleted successfully")

    }catch(err){
        next(err);
    }
}
//get all users
exports.getAllUser=async(req, res,next)=>{
    try{
        const users = await User.find();
        res.status(200).json(users)

    }catch(err){
        next(err);
    }
}


//LOGOUT 
exports.logout =(req, res, next)=>{
    try{
        res.cookie("token", null, {
            expiresIn:new Date (Date.now()),
            httpOnly:true,
        });
        res.status(200).json({
            success:true,
            message:"logout Succesfully "
        })

    }catch(err){
        next(err)
    }
}


//FORGOT PASSWORD 

exports.forgotPassword =async(req, res,next)=>{

        const user =await User.findOne({email:req.body.email});
        if(!user){
            return next(createError(404, "user not found"));
        }

        //get reset password token 
       const resetToken= user.getPasswordToken()
        await user.save({validateBeforeSave:false});


        const resetPsswordUrl =`${req.protocol}//${req.get()}/api/v1/password/reset/${resetToken}`; 
        const message =`Your password reset token is :-\n\n ${resetPsswordUrl} \n\nIf you have not requested this email then, please ignore it `;

    try {

        await sendEmail({
            email:user.email,
            subject:`ecommerce password recovery `,
            message 
        });

        res.status(200).json({
            success:true,
            message:`email set to ${user.email} successfully `
        })

    }catch(err){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined
        await user.save({validateBeforeSave:false});

        next(err);
    }

}

