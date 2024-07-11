const express = require('express');
const app = express();
const db = require('./db'); // Corrected import path to db.js
const bodyParser = require('body-parser');
const MenuItem = require('./models/MenuItem');


app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome to my hotel....How can I help you?');
});


// Import the Router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');


// Use the router for personRoutes file
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);



app.listen(3000, () => {
    console.log("Server is listening on port number 3000");
});