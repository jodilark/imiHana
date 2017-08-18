// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ............| get all orders
exports.getOrdersList = ((req, res) => {
    req.app.get('db').orders_Get_All().then(response => {
        res.status(200).send(response)
    })
});
// ............| get orders by status
exports.getOrdersStatus = ((req, res) => {
    req.app.get('db').orders_Get_ByStatus(req.params.bool).then(response => {
        res.status(200).send(response)
    })
});
// ............| get order by user_id
exports.getOrderUid = ((req, res) => {
    req.app.get('db').orders_Get_ByUid(req.params.id).then(response => {
        res.status(200).send(response)
    })
});
// ............| get a single order by order id
exports.getOrder = ((req, res) => {
    req.app.get('db').orders_Get_ById(req.params.id).then(response => {
        res.status(200).send(response)
    })
});
// ............| Create a new Order
exports.createNewOrder = ((req, res) => {
    req.app.get('db').orders_Create_New(
        req.body.internal_id
        , req.body.tax
        , req.body.final_total
        , req.body.open
        , req.body.user_id
        , req.body.ship_id
        , req.body.bill_id
        , req.body.ship_method
    ).then(_ => {
        res.status(200).send(`Order was created successfully`)
    })
});

// ............| Update order by order id
exports.updateOrder = ((req, res) => {
    req.app.get('db').orders_Update_ById(req.params.id
        , req.body.internal_id
        , req.body.tax
        , req.body.final_total
        , req.body.open
        , req.body.user_id
        , req.body.ship_id
        , req.body.bill_id
        , req.body.ship_method
    ).then(_ => {
        res.status(200).send(`Order was updated successfully`)
    })
});

// ............| Delete order by order id
exports.deleteOrder = ((req, res) => {
    req.app.get('db').orders_Delete_ById(req.params.id).then(_ => {
        res.status(200).send(`Order was deleted successfully`)
    })
});
