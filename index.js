require('dotenv').config(); 
const ip = require("ip");
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = `http://${ip.address()}:${PORT}`;

// Middleware setup
app.use(cors()); 
app.use(express.json()); 


// Routers
const questionCardsRouter = require('./src/routes/questionCards');
const songsRouter = require('./src/routes/songs');


//Routes
app.use('/question_cards', questionCardsRouter);
app.use('/songs', songsRouter);



// Handle 404 - Resource not found
app.use((req, res, next) => {
  res.status(404).send('We think you are lost! 🗺️');
});

// Global error handler
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something broke! ❌');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${HOSTNAME} 🚀.`);
});
