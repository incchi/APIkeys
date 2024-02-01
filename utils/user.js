const userModel = require("../models/userModel")
const { comparePassword } = require("./hashPassword")
const {createToken,verifyToken } = require('../controllers/jwtController')
const fs = require('fs')

const userUtil = {
    login : async(data)=>{
        const {email,username,password} = data
        if((email && password)||(username && password)){
            const userDB = await userModel.findOne({$or:[{email:email},{username:username}]})
            if(userDB) {
                const comparedPassword =await comparePassword(password,userDB?.password)
                if(comparedPassword) {
                    return {value:true,userDB}

                }
                else return false
            }else return false
        }
    },

    findUser : async(data)=>{
        const {email,username} = data;
        const userDB = await userModel.findOne({$or:[{email:email},{username:username}]})
        if(userDB) return userDB;
        else return false
        
    },

    logs : async(username,data)=>{
        const logData = data
        const dirPath = `./logs/${username}`
        if(!fs.existsSync(dirPath)){
            fs.mkdir(dirPath,(error)=>{
                if(error) console.log(error);
            })
        }

        fs.appendFile(`${dirPath}/${username}.txt`,logData+"\n",(error)=>{
            if(error) return error
            else return "log written successfully "
        })
    },

}

module.exports = {...userUtil}