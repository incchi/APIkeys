const { findUser } = require("../utils/user")

const Roles = ["admin","manager","user"]

const userRoleMiddleware = {
    adminRole : async(req,res,next)=>{
        const user = await findUser(req.body)
        if(user.keys.find((g)=> g.role == Roles[0])){
            next()
        }else res.status(401)
    },
    managerRole : async(req,res,next)=>{
        const user = await findUser(req.body)
        if(user.keys.find((g)=> g.role == Roles[1])){
            next()
        }else res.status(401)
    },
    userRole : async(req,res,next)=>{
        const user = await findUser(req.body)
        if(user.keys.find((g)=> g.role == Roles[2])){
            next()
        }else res.status(401)
    },

}

module.exports = {...userRoleMiddleware}