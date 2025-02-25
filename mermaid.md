
```
sequenceDiagram
    participant E as External System
    participant IS as SAP Integration Suite
    participant OS as Order Service
    participant EM as SAP Event Mesh
    participant PS as Payment Service
    participant IN as Inventory Service

    E->>IS: HTTP POST (Create Order)
    activate IS
    IS->>OS: HTTP POST /order/Orders
    activate OS
    OS-->>IS: Order ID, Status: Pending
    deactivate IS
    OS->>EM: Emit OrderCreated Event
    deactivate OS
    EM-->>PS: Publish OrderCreated
    EM-->>IN: Publish OrderCreated
    activate PS
    PS->>PS: processPayment(orderId, amount)
    deactivate PS
    activate IN
    IN->>IN: updateStock(orderId)
    deactivate IN
```
