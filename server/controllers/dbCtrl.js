// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS

// ............| RESET THE DATABASE
exports.resetDb = ((req, res) => req.app.get('db').initDb().then(_ => res.status(200).send(`The database was reset.`)))

// ............| POPULATE DATABASE LISTS
exports.popDb = ((req, res) => req.app.get('db').popDb().then(_ => res.status(200).send(`The database tables have been populated`)))