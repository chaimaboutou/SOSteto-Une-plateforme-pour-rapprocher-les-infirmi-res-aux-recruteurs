const mongoose = require('mongoose');
const connectToDatabase = require('../database');


// Mock console.log and console.error
console.log = jest.fn();
console.error = jest.fn();

// Mock Mongoose's connect method
mongoose.connect = jest.fn(() => Promise.resolve());

// Test case to check database connection
test('should connect to MongoDB', async () => {
  // Call the function to connect to the database
  await connectToDatabase();

  // Check if the Mongoose connect method is called with the correct URI and options
  expect(mongoose.connect).toHaveBeenCalledWith(
    'mongodb+srv://chaimaboutou:chadmin@cluster0.5hulyzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  // Check if console.log is called with the success message
  expect(console.log).toHaveBeenCalledWith('Connected to MongoDB');
});

// Test case to check error handling
test('should handle connection error', async () => {
  // Mock Mongoose's connect method to throw an error
  mongoose.connect = jest.fn(() => Promise.reject(new Error('Connection error')));

  // Call the function to connect to the database
  await connectToDatabase();

  // Check if console.error is called with the error message
  expect(console.error).toHaveBeenCalledWith('Error connecting to MongoDB:', expect.any(Error));
});
