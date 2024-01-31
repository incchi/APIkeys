require ('dotenv').config()
const mongoose = require('mongoose')

const host  = process.env.MONGO_HOST
if(host == "ATLAS_HOST"){
    mongoose.connect(process.env.MONGO_STR, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('connected to DB'))
    .catch((error)=> console.log(error))
}
else{
    mongoose.connect("mongodb://localhost:27017/api")
    .then(console.log('connected to local DB'))
    .catch((error)=> console.log(error))
}

module.exports = mongoose