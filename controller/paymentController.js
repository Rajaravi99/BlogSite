require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // required for stripe payment gateway integration
const flash = require("connect-flash");
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
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.local_url}/success`,
    cancel_url: `${process.env.local_url}/cancelled`,
  });
  res.redirect(session.url);
};

const payment_get_success = async (req, res) => {
    
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
