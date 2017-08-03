// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS

exports.getUsersList = ((req, res) => {
    req.app.get('db').getAllUsers().then(response => {
        res.send(response)
    })
});

