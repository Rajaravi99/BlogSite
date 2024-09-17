require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // required for stripe payment gateway integration
const flash = require("connect-flash");
const { name } = require("ejs");
const Donor=require('../models/donor.js');
const payment_get = (req, res) => {
  res.render("payment/payment");
};

const payment_post = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "donation",
          },
          unit_amount: req.body.lname * 100,
        },
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: `${process.env.remote_url}/complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.remote_url}/cancelled`,
  });
  res.redirect(session.url);
};

const payment_get_success = async (req, res) => {
    const result = Promise.all([
        stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
        stripe.checkout.sessions.listLineItems(req.query.session_id)
    ]);
    const tag=await result;
    // console.log(tag);
    const userName=tag[0].customer_details.name;
    const amount=tag[0].amount_total/100;
    const exists=await Donor.findOne({userName: userName});
    if(exists){
        let currAmount=Number(exists.amount);
        let inNamount=Number(amount);
        let newAmountinN=inNamount+currAmount;
        const updateAmount=newAmountinN.toString();
        const id=exists._id;
        exists.amount=updateAmount;
        console.log(id);
        Donor.findOneAndUpdate(id,exists,{new:true})
            .then((result)=>{
                console.log(result);
            })
            .catch((err)=>{
                console.log(err);
            });
        // try to add this amount to already donated amount;
    }
    else{
        const donor=new Donor({userName,amount});
        donor.save()
            .then((result)=>{
                console.log('saved in database');
            })
            .catch((err)=>{
                console.log(err);
            });
    }
    // console.log(donor);
    req.flash("info", "Donation received, Thank you!!!");
    res.redirect('/');
};

const payment_get_cancelled = (req, res) => {
  req.flash("info", "sorry! payment failed or cancelled");
  res.redirect("/");
};

module.exports = {
  payment_get,
  payment_post,
  payment_get_cancelled,
  payment_get_success,
};
