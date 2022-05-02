const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

const uploadProds = (data) => {
    knex('productos')
  .insert(data)
  .then(() => console.log('Data inserted!'))
  .catch((err) => {
    console.log('There was an error inserting table cars');
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });

}

module.exports = {
    uploadProds
}

