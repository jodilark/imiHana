// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ............| get all sizes 
exports.getSizesList = ((req, res) => {
    req.app.get('db').sizes_Get_All().then(response => {
        res.status(200).send(response)
    })
})
// ............| create a new size 
exports.createNewSize = ((req, res) => req.app.get('db').sizes_Create_New(req.body.type, req.body.width, req.body.height).then(_ => res.status(200).send(`New size was added to the list`)))
// ............| get size by size id 
exports.getSize = ((req, res) => {
    req.app.get('db').sizes_Get_byID(req.params.id).then(response => {
        res.status(200).send(response)
    })
})
// ............| update size by id 
exports.updateSizes = ((req, res) => {
    req.app.get('db').sizes_Update_byID(req.params.id, req.body.type, req.body.width, req.body.height).then(_ => {
        res.status(200).send(`Size with the id of ${req.params.id} was updated successfully`)
    })
})
// ............| delete size by id
exports.deleteSize = ((req, res) => {
    req.app.get('db').sizes_Delete_byID(req.params.id).then(_ => {
        res.status(200).send(`Size with the id of ${req.params.id} was deleted successfully`)
    })
})
