const { premiumRateLimiter, defaultRateLimiter, makeApiCall } = require('../utils/apiRateLimit')
const { findUser, logs } = require('../utils/user')
const Middeleware = require('express')
const middleware = Middeleware()


const premiumLimiter = premiumRateLimiter()
const defaultLimiter = defaultRateLimiter()
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
        console.log(hasPremium);
        let limiter;
        if(hasPremium) {
            console.log("premium");
            limiter = premiumLimiter
        }else {
            console.log("default");
            limiter = defaultLimiter
            
        }
        console.log(limiter);
        // await makeApiCall(limiter,next)
        try {
            await makeApiCall(limiter, next, req, res);
        } catch (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        
    }

}

module.exports = {...apiMiddleware}