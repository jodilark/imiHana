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
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.sessionSecret
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

//      ╔══════════════════════════════════════╗
//      ║               DATABASE               ║
//      ╚══════════════════════════════════════╝
massive(config.dbURLString).then(db => {
  app.set('db', db)
  console.log(`connected to db`)
});

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
        db.createUserByAuth([profile.id, profile.name.givenName])
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
app.get('/api/auth/callback', passport.authenticate('auth0', { successRedirect: `http://${config.frontEndURL}:${config.frontEndPort}/api/auth/me` }), (req, res) => res.status(200).send(req.user))
app.get('/api/auth/me', (req, res) => { //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
  if (!req.user) return res.sendStatus(404);
  res.status(200).send(req.user);
})
app.get('/api/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

//      ╔══════════════════════════════════════╗
//      ║              END POINTS              ║
//      ╚══════════════════════════════════════╝
app.get('/api/users', usersCtrl.getUsersList)

//      ╔══════════════════════════════════════╗
//      ║                TESTS                 ║
//      ╚══════════════════════════════════════╝
app.listen(port, () => console.log(`listening on port ${port}`))