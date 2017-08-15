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

//      ╔══════════════════════════════════════╗
//      ║              VARIABLES               ║
//      ╚══════════════════════════════════════╝
const port = config.port

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
  app.get('/api/auth/logout', (req, res) => { req.logout(), res.redirect('/') })

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

//      ╔══════════════════════════════════════╗
//      ║                TESTS                 ║
//      ╚══════════════════════════════════════╝
  // »»»»»»»»»»»»»»»»»»»║  USER ENDPOINT TESTS
  // ............| Example user update object:
  const updateUserObj = { "first_name": "Lark", "last_name": "Huynh", "phone": "801-699-3049", "email": "jodilarkparker@yahoo.com", "d_ship_id": null, "d_bill_id": null, "admin": false }

  // »»»»»»»»»»»»»»»»»»»║  SIZE ENDPOINT TESTS
  // ............| Example sizes create/update object:
  const SizeObj = { "type": "Portrait", "width": 4, "height": 10 }

  // »»»»»»»»»»»»»»»»»»»║  MATERIALS ENDPOINT TESTS
  // ............| Example Materials create/update object:
  const MaterialObj = { "type": "Pillow" }

  // »»»»»»»»»»»»»»»»»»»║  SHIPPING TYPES ENDPOINT TESTS
  // ............| Example shipping type create/update object:
  const shipObj = { "type": "Same Day" }



//db and node echo
app.listen(port, () => console.log(`listening on port ${port}`))