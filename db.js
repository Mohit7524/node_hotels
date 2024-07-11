/*

const mongoose = require('mongoose');

// Define the MongoDb connection

const mongoURL = 'mongodb://localhost:27017/hotels'   // Replace 'mydatabase with your databae name

// Set up MongoDB Connection

mongoose.connect(mongoURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

// Get the default connection
// Mongoose maintain a default connection object representing the mongoDB Connection

const db = mongoose.connection;

// Default event listeners for database connection 

db.on('connected', () => {
    console.log('Connected to mongoDB Server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);

});

db.on('disconnected',() => {
    console.log('Mongodb disconnected');
});


// Export the database connection
module.exports = db;

*/

const mongoose = require('mongoose');

// Define the MongoDb connection
const mongoURL = 'mongodb://localhost:27017/hotels'; // Replace 'hotels' with your database name

// Set up MongoDB Connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get the default connection
const db = mongoose.connection;

// Default event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB Server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;