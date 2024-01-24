const userModel = require("../models/userModel")
const { comparePassword } = require("./hashPassword")

const userUtil = {
    login : async(data)=>{
        const {email,username,password} = data
        if((email && password)||(username && password)){
            const userDB = await userModel.findOne({$or:[{email:email},{username:username}]})
            if(userDB) {
                const comparedPassword =await comparePassword(password,userDB?.password)
                if(comparedPassword) return {value:true,userDB}
                else false
            }else return false
        }
    }
}

module.exports = {...userUtil}