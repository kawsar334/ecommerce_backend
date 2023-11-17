const express =require("express");
const { createProduct, updateProduct, deleteProduct, getAProduct, getAllProducts, getProductsByCategory, search } = require("../controllers/ProductController");
const { verifyTOkenAndAdmin } = require("../utils/jwtToken");


const router=express.Router();
// CREATE PRODUC
router.post("/createproduct",verifyTOkenAndAdmin, createProduct);
//UPDATE PRODUC
router.put("/:id",verifyTOkenAndAdmin,updateProduct)
//DELETE PRODUCT
router.delete("/:id",verifyTOkenAndAdmin, deleteProduct)
//GET A PRODUCT
router.get("/find/:id", getAProduct)
//GET ALL PRODUCTS AND  FITER PAGINATION 
router.get("/", getAllProducts);
// getProductsByCategory
router.get("/cat", getProductsByCategory);
// search products
router.get("/search", search);   



module.exports=router ; 
