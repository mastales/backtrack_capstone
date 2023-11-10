// Migration for creating the question_cards table
exports.up = function(knex) {
    return knex.schema.createTable('question_cards', (table) => {
      table.increments('qc_id').primary();
      table.string('image_url', 255);
      table.text('description');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('question_cards');
  };
  