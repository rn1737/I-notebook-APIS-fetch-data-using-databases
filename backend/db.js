const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    // Replace 'your-database-name' with your actual database name
    await mongoose.connect('mongodb://localhost:27017/inotebook', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); 
    

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error); 
  } 
};  

module.exports = connectToMongo; 

