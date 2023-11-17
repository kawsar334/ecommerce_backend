


const router = require("express").Router();
const {payment} = require("../controllers/stripe")



// payment 

router.post("/pay", payment);



module.exports = router