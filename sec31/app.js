const path = require('path');

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');

const csrfMiddle = require('./middlewares/csrf-middle');
const authMiddle = require('./middlewares/auth-middle');
const sessionConfig = require('./config/session');
const db = require('./data/database');
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

const mongodbSessionStore = sessionConfig.createSessionStore(session);

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionConfig.createSessionConfig(mongodbSessionStore)));
app.use(csrf());

app.use(csrfMiddle);
app.use(authMiddle);

app.use(authRoutes);
app.use(blogRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(6969);
});
