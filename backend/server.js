const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express()
require('dotenv').config();

const path = require('path');

async function connect(){
    try{
        await mongoose.connect(process.env.mongo_url)
        console.log("Connected to MongoDB");
    } catch(error){
        console.log(error);
    }
}
connect();


app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],      
    allowedHeaders: ['Content-Type'], 
    credentials: true              
  }))


app.listen(process.env.PORT, ()=>{
    console.log("Port is running at", process.env.PORT);
});

const chatInteractionSchema = new mongoose.Schema({
    userId: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
  });
  
  const ChatInteraction = mongoose.model('ChatInteraction', chatInteractionSchema);
  
  app.post('/api/chat', async (req, res) => {
    const { userId, message } = req.body;
    try {
      const chatInteraction = new ChatInteraction({ userId, message });
      await chatInteraction.save();
      res.status(201).json({ message: 'Chat interaction stored successfully' });
    } catch (error) {
      console.error('Error storing chat interaction:', error);
      res.status(500).json({ error: 'An error occurred while storing chat interaction' });
    }
  });







// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// require('dotenv').config();

// // Connect to MongoDB
// async function connect() {
//     try {
//         await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//             useFindAndModify: false
//         });
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1); // Exit process with failure
//     }
// }
// connect();

// // Middleware
// app.use(cors({
//     origin: 'http://localhost:3000', // Update with your frontend URL
//     methods: ['GET', 'POST', 'DELETE', 'PUT'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true
// }));
// app.use(express.json());

// // Define chat interaction schema
// const chatInteractionSchema = new mongoose.Schema({
//     userId: String,
//     message: String,
//     timestamp: { type: Date, default: Date.now }
// });

// // Define chat interaction model
// const ChatInteraction = mongoose.model('ChatInteraction', chatInteractionSchema);

// // API endpoint to store chat interaction
// app.post('/api/chat', async (req, res) => {
//     const { userId, message } = req.body;
//     try {
//         const chatInteraction = new ChatInteraction({ userId, message });
//         await chatInteraction.save();
//         res.status(201).json({ message: 'Chat interaction stored successfully' });
//     } catch (error) {
//         console.error('Error storing chat interaction:', error);
//         res.status(500).json({ error: 'An error occurred while storing chat interaction' });
//     }
// });

// // API endpoint to fetch all chat interactions
// app.get('/api/chat', async (req, res) => {
//     try {
//         const chatInteractions = await ChatInteraction.find().sort({ timestamp: -1 });
//         res.status(200).json(chatInteractions);
//     } catch (error) {
//         console.error('Error fetching chat interactions:', error);
//         res.status(500).json({ error: 'An error occurred while fetching chat interactions' });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });




































































































































