const mongoose = require('mongoose')

mongoose
    .connect("mongodb://localhost:27017/api")
    .then(console.log('connected to DB'))
    .catch((error)=> console.log(error))

module.exports = mongoose