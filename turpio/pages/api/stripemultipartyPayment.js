// // Server-side API route to process the payment

// import stripe from 'stripe';

// const stripe = require('stripe')('sk_test_your_stripe_secret_key');

// export default async (req, res) => {
//   try {
//     // Create a payment intent and confirm it
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: req.body.amount, // amount in cents
//       currency: 'usd',
//       payment_method: req.body.paymentMethodId,
//       confirmation_method: 'manual',
//       confirm: true,
//     });
//     console.log(`PaymentIntent status: ${paymentIntent.status}`);

//     // Create a user account for the service provider and connect it to your Stripe account
//     const serviceProviderAccount = await stripe.accounts.create({
//       type: 'custom',
//       business_type: 'individual',
//       individual: {
//         first_name: req.body.firstName,
//         last_name: req.body.lastName,
//         email: req.body.email,
//       },
//       tos_shown_and_accepted: true,
//     });
//     console.log(`Service provider account created: ${serviceProviderAccount.id}`);

//     // Transfer the payment from your Stripe account to the service provider's account
//     const transfer = await stripe.transfers.create({
//       amount: req.body.amount, // amount in cents
//       currency: 'usd',
//       destination: serviceProviderAccount.id,
//     });
//     console.log(`Transfer created: ${transfer.id}`);

//     res.json({ paymentIntent, serviceProviderAccount, transfer });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
