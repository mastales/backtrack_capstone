exports.up = function(knex) {
    return knex.schema.createTable('question_cards', (table) => {
      table.increments('qc_id').primary().unsigned().notNullable();
      table.string('image_url', 255);
      table.text('description');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('question_cards');
  };
