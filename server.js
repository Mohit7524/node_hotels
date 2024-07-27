const express = require('express');
const app = express();
const db = require('./db'); // Corrected import path to db.js
const bodyParser = require('body-parser');
const MenuItem = require('./models/MenuItem');
const paasport = require('./auth');
const passport = require('passport');
require('dotenv').config();
const PORT = process.env.PORT || 3000;


//Middleware Function
const logRequest = (req, res, next) => {
    console.log('[${new Date().toLocalString()}] Request Made to : ${req.originalUrl}');
    next();
}


app.use(logRequest);


// username and password



app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});
app.get('/', function (req, res) {
    res.send('Welcome to my hotel....How can I help you?');
});


// Import the Router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');


// Use the router for personRoutes file
app.use('/person', personRoutes);
app.use('/menu',localAuthMiddleware,  menuItemRoutes);


app.listen(PORT,() => {
    console.log("Server is listening on port number 3000");
})