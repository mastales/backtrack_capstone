exports.seed = function(knex) {
  return knex('likes').del()
    .then(function () {
      return knex('likes').insert([
        {qc_id: 1, user_id: 1, date: new Date()},
        {qc_id: 2, user_id: 1, date: new Date()},
        // ... more likes
      ]);
    });
};
