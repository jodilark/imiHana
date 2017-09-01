//      ╔══════════════════════════════════════╗
//      ║           REQUIRE MODULES            ║
//      ╚══════════════════════════════════════╝
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const massive = require('massive')
const cors = require('cors')
const Auth0Strategy = require('passport-auth0')
const passport = require('passport')
const config = require('./config')

//      ╔══════════════════════════════════════╗
//      ║            REQUIRE FILES             ║
//      ╚══════════════════════════════════════╝
const usersCtrl = require('./controllers/usersCtrl')
const dbCtrl = require('./controllers/dbCtrl')
const sizesCtrl = require('./controllers/sizesCtrl')
const matsCtrl = require('./controllers/materialsCtrl')
const shipCtrl = require('./controllers/shippingTypeCtrl')
const itemsCtrl = require('./controllers/itemsCtrl')
const statesCtrl = require('./controllers/statesCtrl')
const countryCtrl = require('./controllers/countryCtrl')
const addressCtrl = require('./controllers/addressCtrl')
const ordersCtrl = require('./controllers/ordersCtrl')
const orderItemsCtrl = require('./controllers/orderItemsCtrl')
const itemMatsCtrl = require('./controllers/itemMatsCtrl')
const itemSizesCtrl = require('./controllers/itemSizesCtrl')

//      ╔══════════════════════════════════════╗
//      ║              VARIABLES               ║
//      ╚══════════════════════════════════════╝
const port = config.port
let thisUser

//      ╔══════════════════════════════════════╗
//      ║              MIDDLEWARE              ║
//      ╚══════════════════════════════════════╝
const app = express()
app.use(express.static('./public'))
app.use(bodyParser.json())
app.use(session({resave: true, saveUninitialized: true, secret: config.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

//      ╔══════════════════════════════════════╗
//      ║               DATABASE               ║
//      ╚══════════════════════════════════════╝
massive(config.dbURLString).then(db => app.set('db', db), console.log(`connected to db`));

//      ╔══════════════════════════════════════╗
//      ║                 AUTH                 ║
//      ╚══════════════════════════════════════╝
  passport.use(new Auth0Strategy({
    domain: config.auth0.domain,
    clientID: config.auth0.clientID,
    clientSecret: config.auth0.clientSecret,
    callbackURL: `http://${config.serverURL}:${config.port}/api/auth/callback`
  },
    (accessToken, refreshToken, extraParams, profile, done) => {
      let db = app.get('db')
      db.getUserByAuthId(profile.id).then(user => {
        user = user[0];
        if (!user) {
          db.createUserByAuth([profile.id, profile.name.givenName, profile.name.familyName, profile.emails[0].value])
            .then(user => {
              return done(null, user[0]);
            })
        } else {
          return done(null, user);
        }
      })
    }
  ));

  //  ................  this is invoked one time to set things up
  passport.serializeUser((userA, done) => {
    console.log('Serializing user...', userA);
    thisUser = userA
    var userB = userA;
    done(null, userB); //PUTS 'USER' ON THE SESSION
  });
  passport.deserializeUser((userB, done) => {
    var userC = userB;
    done(null, userC);
  });
  //  ................  auth callbacks and routing
  app.get('/api/auth', passport.authenticate('auth0'));
  app.get('/api/auth/callback', passport.authenticate('auth0', { successRedirect: `http://${config.frontEndURL}:${config.frontEndPort}/#!/orders` }), (req, res) => res.status(200).send(req.user))
  app.get('/api/auth/me', (req, res) => { //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
    if (!req.user) return res.sendStatus(404);
    res.status(200).send(req.user);
  })
  app.get('/api/auth/logout', (req, res) => { thisUser = '', req.logout(), res.redirect('/') })

//      ╔══════════════════════════════════════╗
//      ║              END POINTS              ║
//      ╚══════════════════════════════════════╝
  // ............| DATABASE SCHEMA RESETS
  //══════════════════════════════════════════════╗
  app.delete('/api/reset/db', dbCtrl.resetDb)   //║
  app.post('/api/reset/db', dbCtrl.popDb)       //║
  //══════════════════════════════════════════════╝
  // ............| USER ENDPOINTS
  app.get('/api/users', usersCtrl.getUsersList)
  app.put('/api/users/:id', usersCtrl.updateUsers)
  // ............| SIZES ENDPOINTS
  app.get('/api/sizes', sizesCtrl.getSizesList) 
  app.get('/api/sizes/:id', sizesCtrl.getSize) 
  app.post('/api/sizes', sizesCtrl.createNewSize) 
  app.put('/api/sizes/:id', sizesCtrl.updateSizes) 
  app.delete('/api/sizes/:id', sizesCtrl.deleteSize) 
  // ............| MATERIALS ENDPOINTS 
  app.get('/api/mats', matsCtrl.getMatsList)
  app.get('/api/mats/:id', matsCtrl.getMat)
  app.post('/api/mats', matsCtrl.createNewMat)
  app.put('/api/mats/:id', matsCtrl.updateMat)
  app.delete('/api/mats/:id', matsCtrl.deleteMat)
  // ............| SHIPPING METHODS ENDPOINTS 
  app.get('/api/ship', shipCtrl.getShipList)
  app.get('/api/ship/:id', shipCtrl.getShip)
  app.post('/api/ship', shipCtrl.createNewShip)
  app.put('/api/ship/:id', shipCtrl.updateShip)
  app.delete('/api/ship/:id', shipCtrl.deleteShip)
  // ............| ITEMS ENDPOINTS
  app.get('/api/items', itemsCtrl.getItemsList)
  app.get('/api/items/:id', itemsCtrl.getItem)
  app.post('/api/items', itemsCtrl.createNewItem)
  app.put('/api/items/:id', itemsCtrl.updateItem)
  app.delete('/api/items/:id', itemsCtrl.deleteItem)  
  // ............| STATE ENDPOINTS
  app.get('/api/states', statesCtrl.getStatesList)
  app.get('/api/states/:id', statesCtrl.getState)
  // ............| COUNTRY ENDPOINTS
  app.get('/api/countries', countryCtrl.getCountriesList)
  app.get('/api/countries/:id', countryCtrl.getCountry)
  // ............| ADDRESS ENDPOINTS
  app.get('/api/addresses/', addressCtrl.getAddressList)
  app.get('/api/addresses/:id', addressCtrl.getAddress)
  app.get('/api/addresses/user/:id', addressCtrl.getAddressUid)
  app.post('/api/addresses/:uid', addressCtrl.createNewAddress)
  app.put('/api/addresses/:id', addressCtrl.updateAddress)
  app.delete('/api/addresses/:id', addressCtrl.deleteAddress)
  // ............| ORDERS ENDPOINTS
  app.get('/api/orders/', ordersCtrl.getOrdersList)
  app.get('/api/orders/open/:bool', ordersCtrl.getOrdersStatus)
  app.get('/api/orders/user/:id', ordersCtrl.getOrderUid)
  app.get('/api/orders/:id', ordersCtrl.getOrder)
  app.post('/api/orders', ordersCtrl.createNewOrder)
  app.put('/api/orders/:id', ordersCtrl.updateOrder)
  app.delete('/api/orders/:id', ordersCtrl.deleteOrder)
  // ............| ORDER ITEM ENDPOINTS
  app.get('/api/orderItems', orderItemsCtrl.getOrderItemList)
  app.get('/api/orderItems/:id', orderItemsCtrl.getOrderItemById)
  app.get('/api/orderItems/order/:id', orderItemsCtrl.getOrderItemByOid)
  app.post('/api/orderItems', orderItemsCtrl.createNewOrderItem)
  app.put('/api/orderItems/:id', orderItemsCtrl.updateOrderItem)
  app.delete('/api/orderItems/:id', orderItemsCtrl.deleteOrderItem)
  // ............| ITEM MATERIALS ENDPOINTS
  app.get('/api/itemMats', itemMatsCtrl.getItemMatsList)
  app.get('/api/itemMats/:id', itemMatsCtrl.getItemMatById)
  app.get('/api/itemMats/item/:id', itemMatsCtrl.getItemMatByItemId)
  app.post('/api/itemMats', itemMatsCtrl.createNewItemMat)
  app.put('/api/itemMats/:id', itemMatsCtrl.updateItemMat)
  app.delete('/api/itemMats/:id', itemMatsCtrl.deleteItemMat)
  // ............| ITEM SIZES ENDPOINTS
  app.get('/api/itemSizes', itemSizesCtrl.getitemSizesList)
  app.get('/api/itemSizes/:id', itemSizesCtrl.getitemSizeById)
  app.get('/api/itemSizes/item/:id', itemSizesCtrl.getitemSizeByItemId)
  app.post('/api/itemSizes', itemSizesCtrl.createNewitemSize)
  app.put('/api/itemSizes/:id', itemSizesCtrl.updateitemSize)
  app.delete('/api/itemSizes/:id', itemSizesCtrl.deleteitemSize)
  
  
  //      ╔══════════════════════════════════════╗
  //      ║                TESTS                 ║
  //      ╚══════════════════════════════════════╝
  // ............| logged in user details
  app.get('/api/check', (req, res) => res.send(thisUser))
  // ............| Example user update object:
  const updateUserObj = { "first_name": "Lark", "last_name": "Huynh", "phone": "801-699-3049", "email": "jodilarkparker@yahoo.com", "d_ship_id": null, "d_bill_id": null, "admin": false }
  
  // ............| Example sizes create/update object:
  const SizeObj = { "type": "Portrait", "width": 4, "height": 10 }
  
  // ............| Example Materials create/update object:
  const MaterialObj = { "type": "Pillow" }

  // ............| Example shipping type create/update object:
  const shipObj = { "type": "Same Day" }

  // ............| Example item create/update object:
  const itemObj = { "name": "Sunny Day" , "description": "beautiful piece of work", "price": 54.99, "for_sale": true, "uri": "http://www.hillsidedentalfineart.com/images/arts/far-away-inet.jpg" }

  // ............| Example address create/update object:
  const addressObj = { "address_1": "6225 oak lane", "address_2": "suite 2", "city": "Denver", "zip": "65455", "state_id": 4, "country_id": 1 }

  // ............| Example order create/update object:
  const orderObj = { "internal_id": "Parker-123", "tax": 6.25, "final_total": 37.20, "open": true, "user_id": 1, "ship_id": 1 , "bill_id": 1, "ship_method": 1 }

  // ............| Example order item create/update object:
  const orderItemObj = { "order_id": 2, "qty": 2, "pre_tax_total": 27.32, "item_id": 1, "mat_id": 1, "size_id": 1 }

  // ............| Example item mat create/update object:
  const itemMatObj = { "item_id": 1, "mat_id": 1 }

  // ............| Example item size create/update object:
  const itemSizeObj = { "item_id": 1, "size_id": 1 }

//db and node echo
app.listen(port, _ => console.log(`listening on port ${port}`))