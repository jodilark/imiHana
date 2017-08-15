// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ............| get a list of all shipping types
exports.getShipList = ((req, res) => {
    req.app.get('db').ships_Get_All().then(response => {
        res.status(200).send(response)
    })
});
// ............| get a shipping type by id
exports.getShip = ((req, res) => {
    req.app.get('db').ships_Get_ByID(req.params.id).then(response => {
        res.status(200).send(response)
    })
});
// ............| create a new shipping type
exports.createNewShip = ((req, res) => {
    req.app.get('db').ships_Create_New(req.body.type).then(_ => {
        res.status(200).send(`Shipping type was created successfully`)
    })
});
// ............| update a shipping type by id
exports.updateShip = ((req, res) => {
    req.app.get('db').ships_Update_ByID(req.params.id, req.body.type).then(_ => {
        res.status(200).send(`Shipping type was updated successfully`)
    })
});
// ............| delete a shipping type by id
exports.deleteShip = ((req, res) => {
    req.app.get('db').ships_Delete_ByID(req.params.id).then(_ => {
        res.status(200).send(`Shipping type was deleted successfully`)
    })
});
