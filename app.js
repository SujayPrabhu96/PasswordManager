const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session    = require('express-session');
const app = express();
const { port } = require('./config');
const userRouter = require('./routes/users');
const passwordRouter = require('./routes/password');
require('./passport')(passport);

app.set('views', './views');
app.set('view engine', 'ejs');

//for passport
app.use(session({ secret: 'secret',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//render landing page
app.get('/', (req, res) => res.render('./index'));
app.use('/users', userRouter);
app.use('/apps', passwordRouter);

app.listen(port, () => {
    console.log(`Server listening at PORT: ${port}`);
});