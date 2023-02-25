// pages/api/create-checkout-session.js
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const { price, packageName } = req.body
    try {
        // Create a new Checkout Session with the product and order information
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: packageName,
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.URL_APP}/subscription/success`,
            cancel_url: `${process.env.URL_APP}/subscription`,
        });

        // Return the Checkout Session ID to the client
        res.status(200).json({ sessionId: session.id });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
}