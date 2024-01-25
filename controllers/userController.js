const userModel = require("../models/userModel")
const { hashPassword, comparePassword } = require("../utils/hashPassword")
const { genKey } = require("../utils/keyGenerator")
const { login, verifyKey, findUser } = require("../utils/user")
const { createToken } = require("./jwtController")
const userController = {
    register : async(req,res)=>{
        const { name,email,username,contact,password} = req.body
        const userDB = await userModel.findOne({$or:[{email:email},{username:username}]})
        if(userDB) res.send(`user already exists`)
        else {
            await userModel.create({
                name:name,
                email:email,
                username:username,
                contact:contact,
                password:hashPassword(password),
            })
            res.send('user registerd')
        }
    },

    login : async(req,res)=>{
        const response = await login(req.body) // check pass and username/email
        if(response) { 
            // await createToken(req,res)  // token created
            res.send(response)
        }else { 
            res.send('error')
        }
    },

    key : async(req,res)=>{
            const user =await findUser(req.body);
            await user.keys.push(await genKey())
            await user.save()
            res.send(user.keys)
        
    },
    apiAccess :async(req,res)=> {
        const a =await verifyKey(req.body,req.headers)
        console.log(a);
    }
}

module.exports = {...userController}