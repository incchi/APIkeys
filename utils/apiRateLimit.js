const Bottleneck = require('bottleneck')

function premiumRateLimiter (){
    const limiter = new Bottleneck({
        maxConcurrent : 10
    })
    return limiter
}


function defaultRateLimiter(){
    const limiter = new Bottleneck({
        maxConcurrent : 2
    })
    return limiter
}
//limiter - premium//default
//apiFunction - function that does call the api
//...args - reset parameter syntex indefinite number of arguments
async function makeApiCall (limiter,next,req,res){
    // return await limiter.schedule(()=> apiFunction(...args));
    return await limiter.schedule(() => new Promise((resolve, reject) => {
        next(req, res, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
}
module.exports = {
    premiumRateLimiter,
    defaultRateLimiter,
    makeApiCall
}