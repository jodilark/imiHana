// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS

// ....................  get a list of all state names from the database
exports.getUsersList = ((req, res) => {
    console.log(`got here`)
    req.app.get('db').getAllUsers().then(response => {
        res.send(`nothing is getting through`)
    })
})

