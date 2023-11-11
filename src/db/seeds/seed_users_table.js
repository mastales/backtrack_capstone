exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {user_id: 1, spotify_id: 'spotify_1', username: 'user1', profile_picture_url: 'https://placeholder.com/user1'},
        {user_id: 2, spotify_id: 'spotify_2', username: 'user2', profile_picture_url: 'https://placeholder.com/user2'},
        {user_id: 3, spotify_id: 'spotify_3', username: 'user3', profile_picture_url: 'https://placeholder.com/user3'},
        {user_id: 4, spotify_id: 'spotify_4', username: 'user4', profile_picture_url: 'https://placeholder.com/user4'},
        {user_id: 5, spotify_id: 'spotify_5', username: 'user5', profile_picture_url: 'https://placeholder.com/user5'}
      ]);
    });
};