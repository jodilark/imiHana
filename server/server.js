//  »»»»»»»»»»»»»»»»»»»║   REQUIRE MODULES
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const massive = require('massive')
const cors = require('cors')
const Auth0Strategy = require('passport-auth0')
const passport = require('passport')
const config = require('./config')

//  »»»»»»»»»»»»»»»»»»»║   REQUIRE FILES
const usersCtrl = require('./controllers/usersCtrl')
//  »»»»»»»»»»»»»»»»»»»║   OTHER VARIABLES
const port = config.port

//  »»»»»»»»»»»»»»»»»»»║   MIDDLEWARE
const app = express()
app.use(express.static('../public'))
app.use(bodyParser.json())
app.use(cors())


// .................... database
massive(config.dbURLString).then(db => {
  app.set('db', db)
  console.log(`connected to db`)
});

// // .................... session setups
// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: config.sessionSecret
// }));

// // .................... passport setups
// app.use(passport.initialize())
// app.use(passport.session())


// // .................... make the strategy (still part of passport setups)
// var strategy = new Auth0Strategy({
//   domain: config.domain,
//   clientID: config.clientID,
//   clientSecret: config.clientSecret,
//   callbackURL: '/auth/callback'
// }, function (accessToken, refreshToken, extraParams, profile, done) {
//   // .................... check to see if user exists

//     return done(null, user);

// });


// // »»»»»»»»»»»»»»»»»»»║ INVOKE PASSPORT METHODS
// // .................... pass in the strategy
// passport.use(strategy);

// // .................... serialize user data
// passport.serializeUser(function (user, done) {
//   // console.log(user)
//   done(null, user);
// });

// // ...deserialize user data
// passport.deserializeUser(function (obj, done) {
//   done(null, obj);
// });

// //  .................... authorization endpoints
// app.get('/auth', passport.authenticate('auth0'));
// app.get('/auth/callback',
//   passport.authenticate('auth0', { successRedirect: '/auth/me', failureRedirect: '/login' }), (req, res) => {
//     res.status(200).send(req.user)
//   })
// app.get('/auth/me', function (req, res) {
//   if (!req.user) return res.sendStatus(403);
//   res.status(200).send(req.user);
// })

// // .................... logout
// app.get('/auth/logout', function (req, res) {
//   req.logout();
//   req.session.destroy();
//   res.send('/');
// })

// //  »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
app.get('/api/users', usersCtrl.getUsersList)

// //  »»»»»»»»»»»»»»»»»»»║   TESTS
app.listen(port, () => console.log(`listening on port ${port}`))