namespace my.app;

entity Orders {
    key id: UUID;
    customerId: String;
    amount: Decimal;
    status: String enum { Pending; Processed; Shipped };
}

event OrderCreated {
    orderId: UUID;
    customerId: String;
    amount: Decimal;
}