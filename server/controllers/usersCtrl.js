// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS

exports.getUsersList = ((req, res) => {
    req.app.get('db').getAllUsers().then(response => {
        res.status(200).send(response)
    })
});

// ............| UPDATE USER BY ID
exports.updateUsers = ((req, res) => req.app.get('db').updateUserByID(req.params.id, req.body.first_name, req.body.last_name, req.body.phone, req.body.email, req.body.d_ship_id, req.body.d_bill_id, req.body.admin).then(_ => res.status(200).send(`User was updated successfully.`)));

