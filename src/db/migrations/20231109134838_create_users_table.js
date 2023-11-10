exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('user_id').primary();
      table.string('spotify_id').unique().notNullable();
      table.string('username').notNullable();
      table.string('profile_picture_url');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  