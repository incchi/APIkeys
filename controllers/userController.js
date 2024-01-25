const userModel = require("../models/userModel")
const { hashPassword, comparePassword } = require("../utils/hashPassword")
const { genKey } = require("../utils/keyGenerator")
const { login, verifyKey } = require("../utils/user")

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
        const response = await login(req.body)
        res.send(response)
    },

    key : async(req,res)=>{
        const response =await login(req.body)
        if(response.value) {
            const user = response.userDB;
            await user.keys.push(await genKey())
            await user.save()
            res.send(user.keys)
        }
    },
    header :async(req,res)=> {
        // if(await verifyKey(req.body,req.headers)) {
        //     res.send("ncdsmhbcnj")
        // }
        const a =await verifyKey(req.body,req.headers)
        console.log(a);
    }
}

module.exports = {...userController}