

const jwt = require("jsonwebtoken");

const verifyToken = async(req, res, next)=>{
    const token = req.cookies.token ;
    if(!token){
        return res.status(200).json({message:"token is Not valid", success:false, })
    }else{
        jwt.verify(token, process.env.SECRETE, (err, user)=>{
            if(err){
                return res.status(200).json({message:"you are Not authenticated ", success:false})
            }else{
                req.user = user;
                next();

            }
        })
    }
}




// verify token and admin 
const verifyTOkenAndAdmin = (req, res, next)=>{
   verifyToken(req,res,()=>{
       if (req.user.isAdmin){ 
        next();
    }else{
        res.status(200).json({
            message:"you are Not allwoed ",
            success:false, 
        });
    }
   })
};

module.exports = {verifyToken,verifyTOkenAndAdmin }



