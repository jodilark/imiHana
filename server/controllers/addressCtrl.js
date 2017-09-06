// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS

// ............| GET ALL ADDRESSES
exports.getAddressList = ((req, res) => {
    req.app.get('db').address_Get_All().then(response => {
        res.status(200).send(response)
    })
});

// ............| GET ADDRESS BY ADDRESS ID
exports.getAddress = ((req, res) => {
    req.app.get('db').address_Get_ByID(req.params.id).then(response => {
        res.status(200).send(response)
    })
});

// ............| GET ADDRESS BY USER ID
exports.getAddressUid = ((req, res) => {
    req.app.get('db').address_Get_ByUID(req.params.id).then(response => {
        res.status(200).send(response)
    })
});

// ............| CREATE NEW ADDRESS
exports.createNewAddress = ((req, res) => {
    req.app.get('db').address_Create_New(req.params.uid
        , req.body.address_1
        , req.body.address_2
        , req.body.city
        , req.body.zip
        , req.body.state_id
        , req.body.country_id
    ).then(_ => {
        res.status(200).send(`New address was created successfully`)
    })
});

// ............| UPDATE EXISTING ADDRESS
exports.updateAddress = ((req, res) => {
    req.app.get('db').address_Update_ByID(req.params.id
        , req.body.address_1
        , req.body.address_2
        , req.body.city
        , req.body.zip
        , req.body.state_id
        , req.body.country_id
    ).then(_ => {
        res.status(200).send(`Address was updated successfully`)
    })
});

// ............| DELETE ADDRESS
exports.deleteAddress = ((req, res) => {
    req.app.get('db').address_Delete_ByID(req.params.id).then(_ => {
        res.status(200).send(`Address was deleted successfully`)
    })
});
