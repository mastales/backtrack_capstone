exports.up = function(knex) {
    return knex.schema.createTable('comments', function(table) {
      table.increments('comment_id').primary();
      table.integer('user_id').unsigned().notNullable(); // Make this unsigned
      table.integer('qc_id').unsigned().notNullable();
      table.text('content').notNullable();
      table.timestamp('comment_date').defaultTo(knex.fn.now());
      table.string('track_name', 255);
      table.string('artist_name', 255);
      table.string('track_url', 255);
      table.string('track_image_url', 255);
  
      // Foreign keys
      table.foreign('user_id').references('user_id').inTable('users');
      table.foreign('qc_id').references('qc_id').inTable('question_cards');
    });
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('comments');
  };