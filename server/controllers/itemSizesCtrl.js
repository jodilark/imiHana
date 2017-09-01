// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ............| get all item sizes
exports.getitemSizesList = ((req, res) => {
    req.app.get('db').itemSizes_Get_All().then(response => {
        res.status(200).send(response)
    })
});
// ............| get item sizes by item size id
exports.getitemSizeById = ((req, res) => req.app.get('db').itemSizes_Get_ById(req.params.id).then(response => res.status(200).send(response)));

// ............| get item sizes by order id
exports.getitemSizeByItemId = ((req, res) => {
    req.app.get('db').itemSizes_Get_ByItemId(req.params.id).then(response => {
        res.status(200).send(response)
    })
});
// ............| create new item size
exports.createNewitemSize = ((req, res) => {
    req.app.get('db').itemSizes_Create_New(
        req.body.item_id
        , req.body.size_id
    ).then(_ => {
        res.status(200).send(`item size was created successfully`)
    })
});
// ............| update item size by item size id
exports.updateitemSize = ((req, res) => {
    req.app.get('db').itemSizes_Update_ById(
        req.params.id
        , req.body.item_id
        , req.body.size_id
    ).then(_ => {
        res.status(200).send(`item size was updated successfully`)
    })
});
// ............| delete item size by item size id
exports.deleteitemSize = ((req, res) => {
    req.app.get('db').itemSizes_Delete_ById(req.params.id).then(_ => {
        res.status(200).send(`Item size was deleted successfully`)
    })
});