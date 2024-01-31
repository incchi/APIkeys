const Bottleneck = require('bottleneck')

 function premiumRateLimiter (){
    const limiter = new Bottleneck({
        maxConcurrent : 10
    })
    return limiter
}


async function defaultRateLimiter(){
    const limiter = new Bottleneck({
        maxConcurrent : 10
    })
    return limiter
}

module.exports = {
    premiumRateLimiter,
    defaultRateLimiter
}