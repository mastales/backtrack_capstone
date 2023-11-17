const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route for initiating Spotify authentication
router.get('/',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
  })
);

// Callback route for Spotify to redirect to
router.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// Create a logout endpoint
router.get('/logout', (req, res) => {
    // Passport adds the logout method to request, will end user session
    req.logout((error) => {
      // This callback is called after logout
      if (error) {
          return res.status(500).json({message: "Server error. Please try again later",error: error});
      }
      // Redirect the user back to client-side application
      res.redirect(process.env.CLIENT_URL);
    });
  });

module.exports = router;
