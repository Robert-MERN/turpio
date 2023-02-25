// import paypal from 'paypal-rest-sdk';

// paypal.configure({
//     mode: 'sandbox', // or 'live'
//     client_id: 'your_client_id',
//     client_secret: 'your_client_secret',
// });

// export default async (req, res) => {
//     try {
//         // Create an order and capture the payment
//         const order = await paypal.orders.create({
//             intent: 'CAPTURE',
//             purchase_units: [
//                 {
//                     amount: {
//                         currency_code: 'USD',
//                         value: req.body.amount, // amount in dollars
//                     },
//                 },
//             ],
//         });
//         console.log(`Order created: ${order.id}`);

//         // Capture the payment
//         const capture = await paypal.orders.capture(order.id);
//         console.log(`Capture created: ${capture.id}`);

//         // Create a user account for the service provider or user and connect it to your PayPal account
//         const userAccount = await paypal.identity.create(
//             {
//                 individual: {
//                     first_name: req.body.firstName,
//                     last_name: req.body.lastName,
//                     email: req.body.email,
//                 },
//                 agreement: {
//                     // Accept the PayPal Developer Agreement
//                     accept: true,
//                 },
//             },
//             {
//                 partner_fees: [
//                     {
//                         payee: {
//                             email: req.body.userEmail,
//                         },
//                         amount: {
//                             currency_code: 'USD',
//                             value: req.body.userFee,
//                         },
//                         charge_type: 'PARTNER_FEE',
//                     },
//                 ],
//             }
//         );
//         console.log(`User account created: ${userAccount.id}`);

//         // Calculate the platform fee
//         const platformFee = req.body.amount - req.body.userFee;

//         // Transfer the payment from your PayPal account to the user's account, after deducting the platform fee
//         const transfer = await paypal.payments.create(
//             {
//                 intent: 'sale',
//                 payer: {
//                     payment_method: 'paypal',
//                 },
//                 transactions: [
//                     {
//                         amount: {
//                             currency_code: 'USD',
//                             value: req.body.amount - platformFee, // deduct the platform fee
//                         },
//                         payee: {
//                             email: req.body.userEmail,
//                         },
//                     },
//                 ],
//             },
//             {
//                 partner_fees: [
//                     {
//                         payee: {
//                             email: req.body.userEmail,
//                         },
//                         amount: {
//                             currency_code: 'USD',
//                             value: req.body.userFee,
//                         },
//                         charge_type: 'PARTNER_FEE',
//                     },
//                 ],
//             }
//         );
//         console.log(`Transfer created: ${transfer.id}`);

//         res.json({ success: true });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// };