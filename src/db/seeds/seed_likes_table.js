exports.seed = function(knex) {
  return knex('likes').del()
    .then(function () {
      return knex('likes').insert([
        {like_id: 1, qc_id: 1, user_id: 1, date: new Date()},
        {like_id: 2, qc_id: 2, user_id: 2, date: new Date()},
        {like_id: 3, qc_id: 3, user_id: 3, date: new Date()},
        {like_id: 4, qc_id: 3, user_id: 4, date: new Date()},
        {like_id: 5, qc_id: 4, user_id: 5, date: new Date()},
        {like_id: 6, qc_id: 4, user_id: 1, date: new Date()},
        {like_id: 7, qc_id: 4, user_id: 2, date: new Date()},
        {like_id: 8, qc_id: 5, user_id: 3, date: new Date()},
        {like_id: 9, qc_id: 5, user_id: 4, date: new Date()}
      ]);
    });
};