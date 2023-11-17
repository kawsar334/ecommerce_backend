

const Product =require("../models/ProductModel");



 

// create new product 
exports.createProduct = async(req, res, next)=>{
    try{
        const newProduct = new Product({
            userId:req.user.id,
            ...req.body
            
        });
        const saveProduct = await newProduct.save()
        res.status(200).json(saveProduct);
        console.log(saveProduct)


    }catch(err){
     next(err)
    } 
}  

// update product 
exports.updateProduct = async (req, res, next) => {
    try {
       
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})

        res.status(200).json({
            message:"product updated successfully ",
            success:true,
            updatedProduct
        })

    } catch (err) {
        next(err);
    }
}
//delete  a product 
exports.deleteProduct = async (req, res, next) => {
    try {

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:"product hassbeen deleted !"
        })

    } catch (err) {
        next(err);
    }
}
//get product
exports.getAProduct = async (req, res, next) => {
    try {

        const product = await Product.findById(req.params.id);
        if(!product){
            res.status(200).json({
                message:"Product not found !",
                success:false
            })
        }else{
            res.status(200).json({
                message:"product details !",
                success:true,
                product
            })
        }

    } catch (err) {
        next(err);
    }
}
///get all product  filter pagination 
exports.getAllProducts = async (req, res, next) => {
    const qNew = req.query.new;
    const cat = req.query.category;


    const pageSize = 3;
    const page = parseInt(req.query.page || "0");
    const total = await Product.countDocuments({});
    let products ;
    if(qNew){
        products = await Product.find({}).sort({createdAt:-1}).limit(pageSize).skip(pageSize*page) 
    }else if(cat){
        products = await Product.find({
           category:{
            $in:[cat],
           } 
        }).limit(pageSize).skip(pageSize*page) ;
    }else{
        
        // products = await Product.find({}).limit(pageSize).skip(pageSize * page)
        products = await Product.aggregate([
           {$sample:{size:40}}
        ])
        // await Video.aggregate([{ $sample: { size: 40 } }]);
    }

    res.status(200).json({
        totalPges:Math.ceil(total/pageSize),
        products,
        success:true,
        message:"product list"
    })

   
}

// search products 
exports.search= async(req, res,next)=>{
    const query= req.query.search  
    try{
        let products ;

        if(query){
            products = await Product.find({
                title:{$regex:query , $options:"i"},
            }) ;
        }else{
            products= await Product.find({})
        }


        res.status(200).json({
            success:true,
            products,
            message:"products list"
        })

    }catch(err){
        next(err);
    }
}


 // const qNew  = req.query.new ;
    // const pageSizes = 3;
    // const qCategory = req.query.category ;
    // const page= parseInt(req.query.page || "0")
    
    // try {
    //     let products ;
    //     if(qNew){
    //         products = await Product.find().sort({ createdAt: -1 }).limit(pageSizes).skip(pageSizes* page)
    //     }else if(qCategory){
    //         products = await Product.find({
    //             category:{
    //                 $in:[qCategory]
    //             }
    //         }).limit(pageSizes).skip(pageSizes* page)
    //     }else{
    //         products = await Product.find({}).limit(pageSizes).skip(pageSizes* page);
    //     }

    //     const total = await Product.countDocuments({})
    //     res.status(200).json(products)

    // } catch (err) {
    //     next(err);
    // }



    // get product by category 
    exports.getProductsByCategory = async(req, res,next)=>{
        const cat = req.query.cat;
        try{
            let products ;
            if(cat){
                 products = await Product.find({
                    category:{
                        $in:[cat]
                    }
                 }).sort({ createdAt: -1 })
            }else{
                products = await Product.find({}).sort({createdAt:-1});
            }


            res.status(200).json({
                success:true,
                products,

            })

            

        }catch(err){
            next(err);
        }
    }
