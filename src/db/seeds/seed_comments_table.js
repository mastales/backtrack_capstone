exports.seed = function(knex) {
  return knex('comments').del()
    .then(function () {
      return knex('comments').insert([
        {user_id: 1, qc_id: 1, content: 'Great picture!', track_name: 'Song Name', artist_name: 'Artist Name', track_url: 'http://example.com/track', track_image_url: 'http://example.com/image.jpg'},
        {user_id: 2, qc_id: 1, content: 'I love this!', track_name: 'Another Song', artist_name: 'Another Artist', track_url: 'http://example.com/another-track', track_image_url: 'http://example.com/another-image.jpg'},
        // ... more comments
      ]);
    });
};
