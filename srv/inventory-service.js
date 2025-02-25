const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const messaging = await cds.connect.to('messaging');

    this.on('updateStock', async (req) => {
        const { orderId } = req.data;
        // Simulate stock update logic
        console.log(`Updating stock for order ${orderId}`);
        return `Stock updated for order ${orderId}`;
    });

    // Subscribe to the OrderCreated event
    messaging.on('my/app/order/created', async (msg) => {
        const { orderId } = msg.data;
        await this.emit('updateStock', { orderId });
    });
});