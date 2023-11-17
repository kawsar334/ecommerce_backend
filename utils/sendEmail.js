
const nodeMailer =require("nodemailer");


const sendEmail =async(options)=>{
    const trnsporter =nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            password: process.env.SMPT_PASSWORD
        }
    });
    const mailOptions ={
        from :"",
        to:options.email,
        subject: options.subject,
        text:options.message
    }

   await  trnsporter.sendMail(mailOptions)

}


module.exports = sendEmail