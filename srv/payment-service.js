const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const messaging = await cds.connect.to('messaging');

    this.on('processPayment', async (req) => {
        const { orderId, amount } = req.data;
        // Simulate payment processing logic
        console.log(`Processing payment for order ${orderId}: ${amount}`);
        return `Payment processed for order ${orderId}`;
    });

    // Subscribe to the OrderCreated event
    messaging.on('my/app/order/created', async (msg) => {
        const { orderId, amount } = msg.data;
        await this.emit('processPayment', { orderId, amount });
    });
});