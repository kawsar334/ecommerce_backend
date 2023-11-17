const User = require("../models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");



const register = async (req, res, next) => {
    

    try {
        
      
        const salt = await bcrypt.genSalt(10)
        const userExist = await User.findOne({email:req.body.email})
        if (userExist) {
           
            res.status(200).json({ message: "user already exist please Login ", })
        } else {
            const hasedPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                ...req.body,
                password: hasedPassword
            });
            const savedUser = await newUser.save();
            // pushing notification to admin 
             await User.findOneAndUpdate({ isAdmin: true }, { $push: { notification: `${savedUser.name} has created a New account .` } });
            res.status(200).json({
                success: true,
                messsage: "user hasbeen created !",
                user: savedUser,
            })
        }

    } catch (err) {
        console.log(err)
        next(err);
    }
}


// LOGIN 
const LOGIN = async (req, res, next) => {    
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({
                message: "User not found  !", success: false,
            })
        } else {
            const pass = await bcrypt.compare(req.body.password, user.password);
            if (!pass) {
                return res.status(200).json({
                    message: "Invalid credintials   !", success: false,

                })
            } else { 

             
                const token =await  jwt.sign({ id: user._id,isAdmin:user.isAdmin }, process.env.SECRETE, { expiresIn: "1d" });
                const { password, ...others } = user._doc;                
                await User.findOneAndUpdate({ isAdmin: true }, { $push: { notification: `${user.name} Logged In Now..` } });
                res.cookie("token", token, { httpOnly: true }).json({
                    message: "Login successfully",
                    others, 
                    success: true, 
                    token
                });
            }
        }
    } catch (err) {
        next(err);
    }
} 


module.exports = { register, LOGIN }