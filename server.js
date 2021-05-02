const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// allow helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// use handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set encoding for server and what types of objects 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// allow access to public folder
app.use(express.static(path.join(__dirname, 'public')));
// express initialize the controllers folder with the routes in it
app.use(routes);
// establish sequelize connection with server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
