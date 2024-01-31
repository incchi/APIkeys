const rateLimit = require('express-rate-limit')

const { findUser, logs } = require('../utils/user')
const { premiumRateLimiter, defaultRateLimiter } = require('../utils/apiRateLimit')
const Middeleware = require('express')
const middleware = Middeleware()
const apiMiddleware = {
    // generateKey : async(req,res,next) =>{
    //     const user = await findUser(req.body)
    //     if(user){
    //         await logs(user.username,`${req.method} : ${req.url} @ ${Date.now}`)
    //         await user.keys.push(await genKey()) 
    //         await user.save()
    //         next()
    //     }else res.status(401).send("unable to generate keys")
    // },
    verifyKey : async(req,res,next)=>{
        const user =await findUser(req.body)
        // console.log(req.headers.api);
        const isValidKey =await user.keys.includes(req.headers?.api)
        if(isValidKey) next()
        else res.status(401).send(`not an authorised key`)
    },
    rateLimiter : async(req,res,next)=>{
        const user = await findUser(req.body)
        const hasPremium = user.premium;
        // console.log(hasPremium);
        if(hasPremium) {
            // console.log("jrci");
            console.log(premiumRateLimiter())
        }else {
            // console.log("ckmwe");
            console.log(await defaultRateLimiter())
        }
        
    }

}

module.exports = {...apiMiddleware}