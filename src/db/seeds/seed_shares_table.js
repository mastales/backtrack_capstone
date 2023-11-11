exports.seed = function(knex) {
  return knex('shares').del()
    .then(function () {
      return knex('shares').insert([
        {share_id: 1, qc_id: 1, user_id: 1, share_date: new Date()},
        {share_id: 2, qc_id: 1, user_id: 2, share_date: new Date()},
        {share_id: 3, qc_id: 2, user_id: 3, share_date: new Date()},
        {share_id: 4, qc_id: 3, user_id: 4, share_date: new Date()},
        {share_id: 5, qc_id: 4, user_id: 5, share_date: new Date()},
        {share_id: 6, qc_id: 5, user_id: 1, share_date: new Date()},
        {share_id: 7, qc_id: 5, user_id: 2, share_date: new Date()}
      ]);
    });
};