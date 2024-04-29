const express = require('express');
const PayOS = require('@payos/node');

const payos = new PayOS(
    '837192ce-803f-4ca6-b96b-fcc04afcef92', 
    '5599f7a9-629e-42e0-a7bf-f78da9af8427', 
    '7d3d0aca1db340599f40286f89693fd420c10d6119ff57b2b0165424869b7d28'
);
const app = express ();
app.use(express.static('public'));
app.use(express.json());

const YOUR_DOMAIN = 'http://localhost:3000';
app.post ('/create-payment-link', async(req, res) => {
    const order = {
        amount: 10000,
        description: 'Bí mật của may mắn',
        orderCode : 14,
        returnUrl: `${YOUR_DOMAIN}/success.html`,
        cancelUrl: `${YOUR_DOMAIN}/cancel.html`
    };
    const paymentLink = await payos.createPaymentLink(order);
    res.redirect(303, paymentLink.checkoutUrl);
})
// webhook url https using ngrok 
// https://2424-2402-800-623f-4d5b-a5b4-c5e7-6dbc-d74e.ngrok-free.app/receive-hook
app.post('/receive-hook', async(req, res) => {
    console.log(req.body);
    res.json();
});

app.listen(3000, () => console.log('running on port 3000'));
