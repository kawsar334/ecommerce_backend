


const stripe = require("stripe")(process.env.STRIPE);





module.exports.payment = (req, res, next) => {
    try {

      stripe.charges.create(
          {
              source: req.body.tokenId,
              amount: req.body.amount,
              currency: "usd",
          },
          (stripErr,stripeRes)=>{
            if(stripErr){
                res.status(500).json(stripErr)
            }else{
                res.status(200).json(stripeRes)
            }

          }
      )

    } catch (err) {
        next(err);
    }
}