const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required:true,
            unique : true
        },
        username : {
            type : String,
            default : `user${Date.now()}`,
            unique : true,

        },
        contact : {
            type : Number,
            default: 0,
            unique : true
        },
        password : {
            type : String,
            required:true
        },
        keys : {
            type : [String]
        },
        premium : {
            type : Boolean,
            default : false
        }

    },{
        timestamps : {
            createdAt:'createdAt',
            updatedAt : 'updatedAt'
        }
    }
)


module.exports = mongoose.model('userModel',userSchema)
