const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

knex.schema
  .createTable('productos', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('price').notNullable();
  })
  .then(() => console.log('Table created!'))
  .catch((err) => {
    console.log('There was an error creating table cars');
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
