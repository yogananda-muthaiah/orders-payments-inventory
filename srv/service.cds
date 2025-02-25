

service OrderService {
    entity Orders as projection on my.app.Orders;
}

service PaymentService {
    function processPayment(orderId: UUID, amount: Decimal) returns String;
}

service InventoryService {
    function updateStock(orderId: UUID) returns String;
}

@topic: 'my/app/order/created'
event OrderCreated {
    orderId: UUID;
    customerId: String;
    amount: Decimal;
}