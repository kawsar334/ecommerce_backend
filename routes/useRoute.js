const express =require("express");

const { verifyToken, verifyTOkenAndAdmin } = require("../utils/jwtToken");
const { updateUser, deleteUser, getaUser, getAllUser } = require("../controllers/user");
const router =express.Router();



// update user
router.put("/:id", verifyTOkenAndAdmin, updateUser);
//delete user
router.delete("/:id", verifyTOkenAndAdmin, deleteUser);
//get user
router.get("/find/:id",verifyToken, getaUser);
//get all user
router.get("/",verifyTOkenAndAdmin, getAllUser);

module.exports =router  ;
