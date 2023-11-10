const express = require('express');
const songsController = require('../controllers/songsController');

const router = express.Router();

// Route for song search
router.get('/search', songsController.searchSongs);

module.exports = router;
