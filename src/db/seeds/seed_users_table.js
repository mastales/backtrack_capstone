// In your seed file for the users table
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user1', spotify_id: 'spotify_user1'},
        {username: 'user2', spotify_id: 'spotify_user2'},
        // ... other users
      ]);
    });
};