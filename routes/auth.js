


const express = require("express");

const router = express.Router();

const nodeMailer = require("nodemailer");
const {register, LOGIN} = require("../controllers/auth")


router.post("/register", register);
router.post("/login",LOGIN);


module.exports = router