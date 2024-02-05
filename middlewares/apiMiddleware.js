const { off } = require('../models/userModel')
const apiRateLimitUtil = require('../utils/apiRateLimit')
// const { premiumRateLimiter, defaultRateLimiter, makeApiCall } = require('../utils/apiRateLimit')
const { findUser, logs } = require('../utils/user')
const Middeleware = require('express')
const middleware = Middeleware()
const setRateLimit = require('express-rate-limit')


// const premiumLimiter = premiumRateLimiter()
// const defaultLimiter = defaultRateLimiter()
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
        const isValidKey =await user.keys.find((key)=> key.value==req.headers?.api)
        if(isValidKey) next()
        else res.status(401).send(`not an authorised key`)
    },
    rateLimiter : async(req,res,next)=>{
        const user = await findUser(req.body)
        const hasPremium = user.premium;
        console.log(hasPremium);
        if(hasPremium){
            premiumLimitMiddleware(req,res,next)
        }else defaultLimitMiddleware(req,res,next)
        
    }

}
const premiumLimitMiddleware = setRateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "You have exceeded your 5 requests per minute limit.",
    headers: true,
  });
const defaultLimitMiddleware = setRateLimit({
    windowMs: 60 * 1000,
    max: 2,
    message: "You have exceeded your 2 requests per minute limit.",
    headers: true,
  });
  
module.exports = {...apiMiddleware}