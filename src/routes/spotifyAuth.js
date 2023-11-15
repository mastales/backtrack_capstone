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

module.exports = router;
