const mongoose = require('mongoose');
require('dotenv').config();
// Define the MongoDb connection
//const mongoURL = 'mongodb://localhost:27017/hotels'; // Replace 'hotels' with your database name
const mongoURL = process.env.MONGODB_URL_LOCAL
//const mongoURL = process.env.MONGODB_URL

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