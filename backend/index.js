const connectToMongo=require('./db'); 
connectToMongo(); 
const express = require('express');
const app = express();
const port = 5001; // Ensure this port matches the one you're using
app.use(express.json()) 
// AVAILABLE ROUTES // 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});  





 
