const path = require('path');

const express = require('express');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

const db = require('./data/database');
const demoRoutes = require('./routes/demo');

const app = express();

const sessionStore = new MongoDBStore({
  uri: 'mongodb://localhost:27017',
  databaseName: 'auth-demo',
  collection: 'sessions'
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'switch', // personal phrase to secure session
  resave: false, // make sure data was changed
  saveUninitialized: false, // make sure some data is available
  store: sessionStore, // where the data is being stored
  cookie: {
    maxAge: 30*24*60*60*1000 // 
  }
}));

app.use(async function(req, res, next) {
  const user = req.session.user
  const isAuth = req.session.isAuthenticated
  if (!user || !isAuth) {
    return next();
  }
  
  const userDoc = await db.getDb().collection('users').findOne({_id: user.id})
  const isAdmin = userDoc.isAdmin;
  
  res.locals.isAuth = isAuth;
  res.locals.isAdmin = isAdmin;
  
  next();
})

app.use(demoRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(6969);
});
