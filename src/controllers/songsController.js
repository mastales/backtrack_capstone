const fs = require('fs').promises;
const path = require('path');
const passport = require('passport');


// Controller for song search
const searchSongs = async (req, res) => {
  try {
    const { query } = req.query; // Extracting the search term from query parameters
    const dataPath = path.join(__dirname, '../data/top100.json'); // Path to your JSON file
    const jsonData = await fs.readFile(dataPath, 'utf8');
    const songs = JSON.parse(jsonData);

    // Filter or search songs based on the query
    const matches = songs.filter(song =>
      song.name.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
    );

    res.json({
      for: query,
      totalResults: matches.length,
      startIndex: 0,
      itemsPerPage: matches.length, // For simplicity, we're not paginating here
      artistmatches: matches,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the search.');
  }
};

module.exports = {
  searchSongs,
};
