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
    },
    findUser : async(data)=>{
        const {email,username} = data;
        const userDB = await userModel.findOne({$or:[{email:email},{username:username}]})
        if(userDB) return userDB;
        else return false
        
    },

    verifyKey :async(data,header)=> {
        const user =await userUtil.findUser(data)
        await user.keys.find(apiKey => {
            if(apiKey === header.api){
                const result = 10
                console.log("millo");
                return result
            }
        });
    }

}

module.exports = {...userUtil}