// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ............| get all items
exports.getItemsList = ((req, res) => {
    req.app.get('db').items_Get_All().then(response => {
        res.status(200).send(response)
    })
});
// ............| get all materials
exports.getItem = ((req, res) => {
    req.app.get('db').items_Get_ByID(req.params.id).then(response => {
        res.status(200).send(response)
    })
});
// ............| get all materials
exports.createNewItem = ((req, res) => {
    req.app.get('db').items_Create_New(req.body.name, req.body.description, req.body.price, req.body.for_sale, req.body.uri).then(_ => {
        res.status(200).send(`Item has been created successfully`)
    })
});
// ............| get all materials
exports.updateItem = ((req, res) => {
    req.app.get('db').items_Update_ByID(req.params.id, req.body.name, req.body.description, req.body.price, req.body.for_sale, req.body.uri).then(_ => {
        res.status(200).send(`Item has been updated successfully`)
    })
});
// ............| get all materials
exports.deleteItem = ((req, res) => {
    req.app.get('db').items_Delete_ByID(req.params.id).then(_ => {
        res.status(200).send(`Item has been deleted successfully`)
    })
});
