const mongoose =require('mongoose')

const marketSchema = new mongoose.Schema(
    {
        storeID : {
            type : Number,
            required : true
        },
        storeName : {
            type : String,
            required : true
        },
        distance : {
            type : Number
        },
        items : {
            type : [String]
        }
    }
)

module.exports = mongoose.model("marketModel",marketSchema)