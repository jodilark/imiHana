// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ............| get all order items
exports.getOrderItemList = ((req, res) => {
    req.app.get('db').orderItems_Get_All().then(response => {
        res.status(200).send(response)
    })
});
// ............| get order items by order item id
exports.getOrderItemById = ((req, res) => req.app.get('db').orderItems_Get_ById(req.params.id).then(response => res.status(200).send(response)));

// ............| get order items by order id
exports.getOrderItemByOid = ((req, res) => {
    req.app.get('db').orderItems_Get_ByOrderId(req.params.id).then(response => {
        res.status(200).send(response)
    })
});
// ............| create new order item
exports.createNewOrderItem = ((req, res) => {
    req.app.get('db').orderItems_Create_New(
        req.body.order_id
        , req.body.qty
        , req.body.pre_tax_total
        , req.body.item_id
        , req.body.mat_id
        , req.body.size_id
    ).then(_ => {
        res.status(200).send(`Order item was created successfully`)
    })
});
// ............| update order item by order item id
exports.updateOrderItem = ((req, res) => {
    req.app.get('db').orderItems_Update_ById(
        req.params.id
        , req.body.order_id
        , req.body.qty
        , req.body.pre_tax_total
        , req.body.item_id
        , req.body.mat_id
        , req.body.size_id
    ).then(_ => {
        res.status(200).send(`Order item was updated successfully`)
    })
});
// ............| delete order item by order item id
exports.deleteOrderItem = ((req, res) => {
    req.app.get('db').orderItems_Delete_ById(req.params.id).then(_ => {
        res.status(200).send(`Order item was deleted successfully`)
    })
});