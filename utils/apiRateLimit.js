const rateLimiter = require('express-rate-limit')

const apiRateLimitUtil = rateLimiter({
    windowMs : 60*1000,
    max : 2,
    message : `you have exceeded 2 req `,
    headers : true
});

module.exports = apiRateLimitUtil