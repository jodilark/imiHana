// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS
// ............| get all materials
exports.getMatsList = ((req, res) => {
    req.app.get('db').mats_Get_All().then(response => {
        res.status(200).send(response)
    })
});
// ............| get material by id
exports.getMat = ((req, res) => {
    req.app.get('db').mats_Get_ByID(req.params.id).then(response => {
        res.status(200).send(response)
    })
});
// ............| create a new material
exports.createNewMat = ((req, res) => {
    req.app.get('db').mats_Create_New(req.body.type).then(response => {
        res.status(200).send(`New material ${req.body.type} was created successfully`)
    })
});
// ............| update a material by id
exports.updateMat = ((req, res) => {
    req.app.get('db').mats_Update_ByID(req.params.id, req.body.type).then(response => {
        res.status(200).send(`Material with the id of ${req.params.id} was updated successfully`)
    })
});
// ............| delete a material by id
exports.deleteMat = ((req, res) => {
    req.app.get('db').mats_Delete_ByID(req.params.id).then(response => {
        res.status(200).send(`Material with the id of ${req.params.id} was deleted successfully`)
    })
});
