exports.seed = function(knex) {
  return knex('question_cards').del()
    .then(function () {
      return knex('question_cards').insert([
        {image_url: 'http://example.com/image1.jpg', description: 'What does this picture make you think of?'},
        {image_url: 'http://example.com/image2.jpg', description: 'How do you feel when you see this?'},
        // ... more question cards
      ]);
    });
};
