import React, { useState, useEffect } from 'react';

const SongSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    // Fetch the songs data when the component mounts
    fetch('/top100.json') // Adjust the path as needed
      .then(response => response.json())
      .then(data => setSongs(data.tracks.track));
  }, []);

  useEffect(() => {
    // Filter songs based on the search term
    if (searchTerm) {
      const results = songs.filter(song =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSongs(results.slice(0, 4)); // Limit to 4 results
    } else {
      setFilteredSongs([]);
    }
  }, [searchTerm, songs]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a song..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredSongs.length > 0 && (
        <ul>
          {filteredSongs.map((song, index) => (
            <li key={index}>
              {song.name} by {song.artist.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongSearch;
