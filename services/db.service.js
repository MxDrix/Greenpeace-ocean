/*
Import
*/
const mongoose = require('mongoose')
//

/*
Config
*/
    const initClient = () => {
        return new Promise( (resolve, reject) => {
            mongoose.connect("mongodb://localhost:27017/Greenpeace", { useNewUrlParser: true })
            .then( db => resolve( { db: db, url: process.env.MONGO_URL } ))
            .catch( error => reject(`MongoDB not connecte`, error) )
        })
    }
//

/*
Export
*/
    module.exports = { initClient };
//