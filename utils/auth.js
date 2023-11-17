// const createError=require("./error");
// const jwt =require("jsonwebtoken");
// const User =require("../models/User");

// exports.isAuthenticatedUser = async(req, res,next)=>{
//     // try{
//     //     const token =req.cookies.token ;
//     //     console.log(token)
//     //     if(!token){
//     //         return res.status(403).json("you are not authenticated ")
//     //     }else{
        
//     //         jwt.verify(token, process.env.JWT_SECRET,async(err, user)=>{
//     //         if(err){
//     //             return res.status(403).json("invalid token")
//     //         }else{
//     //             req.user = await User.findById(user.id);
//     //             next();
//     //         }

//     //         })
//     //     }


//     }catch(err){
//         console.log(err)
//         next(err)
//     }
// }


// exports.authorizeRole=(...roles)=>{
//     return (req, res, next)=>{
//         console.log("req.user.role",req.user.role)
//         if(!roles.includes(req.user.role)){

//             next(createError(403, `Role :${req.user.role} is Not allowed to access this resource`))
//             // res.status(403).json()
//         }else{
//             next()
//         }
//     }

// }

// // module.exports =isAuthenticatedUser