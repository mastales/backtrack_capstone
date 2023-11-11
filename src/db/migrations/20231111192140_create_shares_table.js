exports.up = function(knex) {
    return knex.schema.createTable('shares', (table) => {
      table.increments('share_id').primary();
      table.integer('qc_id').unsigned().references('qc_id').inTable('question_cards').onDelete('CASCADE');
      table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
      table.timestamp('share_date').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('shares');
  };
