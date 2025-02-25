const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const { Orders } = this.entities;
    const messaging = await cds.connect.to('messaging');

    this.on('CREATE', Orders, async (req) => {
        const order = req.data;
        order.status = 'Pending';

        // Insert the order into the database
        const result = await cds.run(INSERT.into(Orders).entries(order));

        // Emit the OrderCreated event
        await messaging.emit('my/app/order/created', {
            orderId: order.id,
            customerId: order.customerId,
            amount: order.amount
        });

        return result;
    });
});