// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ............| get all item mats
exports.getItemMatsList = ((req, res) => {
    req.app.get('db').itemMats_Get_All().then(response => {
        res.status(200).send(response)
    })
});
// ............| get item mats by item mat id
exports.getItemMatById = ((req, res) => req.app.get('db').itemMats_Get_ById(req.params.id).then(response => res.status(200).send(response)));

// ............| get item mats by order id
exports.getItemMatByItemId = ((req, res) => {
    req.app.get('db').itemMats_Get_ByItemId(req.params.id).then(response => {
        res.status(200).send(response)
    })
});
// ............| create new item mat
exports.createNewItemMat = ((req, res) => {
    req.app.get('db').itemMats_Create_New(
        req.body.item_id
        , req.body.mat_id
    ).then(_ => {
        res.status(200).send(`Item mat was created successfully`)
    })
});
// ............| update item mat by item mat id
exports.updateItemMat = ((req, res) => {
    req.app.get('db').itemMats_Update_ById(
        req.params.id
        , req.body.item_id
        , req.body.mat_id
    ).then(_ => {
        res.status(200).send(`Item mat was updated successfully`)
    })
});
// ............| delete item mat by item mat id
exports.deleteItemMat = ((req, res) => {
    req.app.get('db').itemMats_Delete_ById(req.params.id).then(_ => {
        res.status(200).send(`Item size was deleted successfully`)
    })
});