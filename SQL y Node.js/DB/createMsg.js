const { options } = require('./options/sqlite');
const knex = require('knex')(options);

knex.schema
  .createTable('mensajes', (table) => {
    table.string('username').notNullable();
    table.string('time').notNullable();
    table.string('text').notNullable();
  })
  .then(() => console.log('Table created!'))
  .catch((err) => {
    console.log('There was an error inserting table cars');
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });

