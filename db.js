const knexLibrary = require('knex');
const knexConfig = require('./knexfile');

const knex = knexLibrary(knexConfig);

module.exports = knex;
