

const bcrypt = require("bcrypt");

const User = require("../models/User");


// UPDATE USER
module.exports.updateUser = async (req, res, next) => {
    try {
        if(req.body.passwor){
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        const udatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(200).json({
            message:"user updated successfully",
            udatedUser,
            success:true
        })

    } catch (err) {
        next(err);
    }
}

// DELETE USER
module.exports.deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"user hasbeen deleted",
            success:true
        })

    } catch (err) {
        next(err);
    }
}


// GET SINGLE USER
module.exports.getaUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id);

        const {password, ...details} = user._doc
        res.status(200).json({
            message: "user details",
            success: true,
            user:details
        })


    } catch (err) {
        next(err);
    }
}


// GET ALL USER
module.exports.getAllUser = async (req, res, next) => {


    const query = req.query.new;
    const name = req.query.name;
    const page = parseInt(req.query.page) || 0; 
    const pageSize = 3;
    const totalUser = await User.countDocuments({});
    let users;

    try {
        // if(name){
        //     // users = await User.find({title:{$in:name}}).limit(pageSize).skip(pageSize*page)
        // }
        users = await User.find();
        res.status(200).json({
            // totalPage:Math.ceil(totalUser/pageSize),
            message:"user List",
            users,
        })


    } catch (err) {
        next(err);
    }
}


///user stats 
// module.exports.getAllUser = async (req, res, next) => {
//     try{
        
//                 const date = new Date();
//                 const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
//               const data = await User.aggregate([
//                 {$match:{createdAt:{$gte:lastYear}}},
//                 {$project:{month:{$month:"$createdAt"}}},
//                 {$group:{_id:"$month", total:{$sum:1}}}
//               ])
//               res.status(200).json(data)

//     }catch(err){
//         next(err);
//     }
// }