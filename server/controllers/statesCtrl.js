// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS

// ............| GET ALL STATES
exports.getStatesList = ((req, res) => {
    req.app.get('db').state_Get_All().then(response => {
        res.status(200).send(response)
    })
});

// ............| GET STATES BY ID
exports.getState = ((req, res) => {
    req.app.get('db').state_Get_ByID(req.params.id).then(response => {
        res.status(200).send(response)
    })
});
