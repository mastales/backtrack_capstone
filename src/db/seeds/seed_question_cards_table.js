exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('question_cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('question_cards').insert([
        {qc_id: 1, image_url: 'https://placeholder.com/qc1', description: 'A question about a song that represents a part of you that is hard to put into words.'},
        {qc_id: 2, image_url: 'https://placeholder.com/qc2', description: 'A debate on whether different genders experience music differently.'},
        {qc_id: 3, image_url: 'https://placeholder.com/qc3', description: 'A query about what one appreciates most in a song - lyrics, melody, or overall vibe.'},
        {qc_id: 4, image_url: 'https://placeholder.com/qc4', description: 'A prompt asking about the last song sent to someone.'},
        {qc_id: 5, image_url: 'https://placeholder.com/qc5', description: 'A question about a song that was misunderstood in childhood but realized differently as an adult.'}
      ]);
    });
};