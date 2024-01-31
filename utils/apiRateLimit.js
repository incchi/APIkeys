const Bottleneck = require('bottleneck')

 function premiumRateLimiter (){
    const limiter = new Bottleneck({
        maxConcurrent : 10
    })
}


async function defaultRateLimiter(){
    const limiter = new Bottleneck({
        maxConcurrent : 10
    })
}

module.exports = {
    premiumRateLimiter,
    defaultRateLimiter
}