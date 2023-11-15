require('dotenv').config(); 
const ip = require("ip");
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const expressSession = require('express-session');
const configurePassport = require('./passportConfig');

const app = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = `http://${ip.address()}:${PORT}`;

// Middleware setup
app.use(cors()); 
app.use(express.json()); 
app.use(helmet());

//Enable Express-Session
app.use(
    expressSession({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  );
configurePassport();

//Enable CORS
app.use(
    cors({
      origin: true,
      credentials: true
    })
  );

app.use(passport.initialize());
app.use(passport.session());

// Routers
const questionCardsRouter = require('./src/routes/questionCards');
const songsRouter = require('./src/routes/songs');
const spotifyAuth = require('./src/routes/spotifyAuth');

//Routes
app.use('/question_cards', questionCardsRouter);
app.use('/songs', songsRouter);
app.use('/auth/spotify', spotifyAuth);

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
