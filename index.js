

const express =require("express");
const app =express();
const env = require("dotenv");
env.config()
const connectDatabase = require("./config/database");
const cookieParser= require("cookie-parser")
const cors = require("cors")
app.use(express.json());
const PORT = process.env.PORT ||4040
const productRoute = require("./routes/productRoute");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/useRoute")
const categoryRoute = require("./routes/cat");
const stripeRoute = require("./routes/stripeRoute");

const bodyParser = require("body-parser")

app.use(express.json());
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
  
app.use("/api/auth/", authRoute)
app.use("/api/product/", productRoute); 
app.use("/api/user/", userRoute)
app.use("/api/cat/", categoryRoute)
app.use("/api/stripe/", stripeRoute)   






// middleware 
app.use((err, req, res, next)=>{
   const  message = err.message || "something went wrong ";
    const status = err.status || 500;
    return  res.status(status).json({
        message, 
        status, 
        success:false
    })
})
// connnection database and route 
connectDatabase()
app.listen(PORT, ()=>{
    console.log("serever connected",PORT)
});
