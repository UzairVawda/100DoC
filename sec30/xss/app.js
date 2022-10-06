const path = require('path');

const express = require('express');

const db = require('./data/database');
const session = require('express-session');
const csrf = require('csurf');
const discussionRoutes = require('./routes/discussion');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'super-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    sameSite: 'lax'
  }
}));
app.use(csrf());


app.use(discussionRoutes);

app.use(function(error, req, res, next) {
  console.log(error);
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(6969);
});
