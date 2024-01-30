require ('dotenv').config()
const mongoose = require('mongoose')

const host  = process.env.MONGO_HOST
if(host == "ATLAS_HOST"){
    mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('connected to DB'))
    .catch((error)=> console.log(error))
}
else{
    mongoose.connect(process.env.LOCAL_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('connected to DB'))
    .catch((error)=> console.log(error))
}

module.exports = mongoose