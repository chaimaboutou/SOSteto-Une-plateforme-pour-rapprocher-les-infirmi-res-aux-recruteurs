const mongoose = require('mongoose');

// Define your MongoDB connection URI
const mongoURI = 'mongodb+srv://chaimaboutou:chadmin@cluster0.5hulyzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


// Function to connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectToDatabase;