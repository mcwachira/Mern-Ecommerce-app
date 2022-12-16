const express = require('express')
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const router = express.Router()

router.post('/payments', (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr)
            } else {
                res.status(200).json(stripeRes)
            }
        }

    )
},


)
