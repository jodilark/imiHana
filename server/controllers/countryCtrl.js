// »»»»»»»»»»»»»»»»»»»║  DATABASE REQUESTS

// ............| GET ALL COUNTRIES
exports.getCountriesList = ((req, res) => {
    req.app.get('db').country_Get_All().then(response => {
        res.status(200).send(response)
    })
});

// ............| GET COUNTRY BY ID
exports.getCountry = ((req, res) => {
    req.app.get('db').country_Get_ByID(req.params.id).then(response => {
        res.status(200).send(response)
    })
});