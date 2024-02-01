const userModel = require("../models/userModel")
const { hashPassword, comparePassword } = require("../utils/hashPassword")
const { genKey } = require("../utils/keyGenerator")
const { login, verifyKey, findUser, logs } = require("../utils/user")
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
            res.send(response)
        }else { 
            res.send('error')
        }
    },

    key : async(req,res)=>{
            const user =await findUser(req.body);
            await logs(user.username,`${req.url} ${req.method} @ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`)
            let role = ""
            if(req.body.role == undefined) {
                role = "user"
            }else role = req.body.role


            user.premium = req.body.premium ;
            await user.keys.push({value : await genKey(),role :role})
            
            await user.save()
            res.send(user.keys)
    },
    apiAccess :async(req,res)=> {
        
        res.send('hitting ');
    },
    // assignRole : async(req,res)=>{
    //     const user = await findUser(req.body);
    //     await logs(user.username,`${req.url} ${req.method} @ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`)
    //     user.role = req.body.role
    //     await user.save()
    //     res.send(`role assigned as ${user.role}`)
    // }
}

module.exports = {...userController}