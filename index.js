//  =================   REQUIRE MODULES
const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')

//  =================   REQUIRE FILES
const productsCtrl = require('./js/controllers/productsCtrl')

//  =================   OTHER VARIABLES
const port = 3000

//  =================   USE MODULES
const app = express()
app.use(bodyParser.json())
// massive({
//   host: 'localhost',
//   port: 5432,
//   database: //enter db
//   , user: 'postgres',
//   password: //enter password
// }).then(function (db) {
//   app.set('db', db),
//     console.log('connected to db')
// });

//  =================   ENDPOINTS
// example: app.get('/products/:id', productsCtrl.getProductByID)
app.get('/api/products', productsCtrl.getTestProducts)

//  =================   TESTS
app.listen(port, function(){
    console.log(`listening on port ${port}`)
})