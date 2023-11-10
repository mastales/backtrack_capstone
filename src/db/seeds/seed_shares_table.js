exports.seed = function(knex) {
  return knex('shares').del()
    .then(function () {
      return knex('shares').insert([
        {qc_id: 1, user_id: 2, share_date: new Date()},
        {qc_id: 2, user_id: 2, share_date: new Date()},
        // ... more shares
      ]);
    });
};
