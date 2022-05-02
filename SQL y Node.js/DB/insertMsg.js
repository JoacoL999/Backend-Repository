const { options } = require('./options/sqlite');
const knex = require('knex')(options);
const fs = require('fs')


const uploadMSG = (data) => {

        knex(`mensajes`).insert(data)
        .then(()=> console.log(`Uploaded`))
        .catch((err)=>{
            console.log(err);throw err})
        .finally(()=>{
            knex.destroy()
        })
    
    }


  module.exports = {
    uploadMSG
  }