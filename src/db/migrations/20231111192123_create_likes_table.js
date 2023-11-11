// Migration for creating the likes table
exports.up = function(knex) {
    return knex.schema.createTable('likes', (table) => {
      table.increments('like_id').primary();
      table.integer('qc_id').unsigned().references('qc_id').inTable('question_cards').onDelete('CASCADE');
      table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
      table.timestamp('date').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('likes');
  };