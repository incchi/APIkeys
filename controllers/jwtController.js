const jwt  = require('jsonwebtoken')
const key = "uhvadnkjcsm;sgjksfhbvnkjdlmksndhbskjfvmlsdk"
const jwtController = {
    createToken :async(req,res,next) => {
        const{email,username} =req.body
        if(email) {
            const token = await jwt.sign({ email },key)
            res.setHeader('authorisation', 'bearer '+token)
            res.cookie('jwtCookie',token,{expiresIn:"2d"})
            next()
        }
        if(username) {
            const token = await jwt.sign({username},key)
            res.setHeader('authorisation', 'bearer '+token)
            res.cookie('jwtCookie',token,{expiresIn:"2d"})
            next()
        }
        
    },
    verifyToken :async(req,res,next)=> {
        const authHeader =await req.headers?.authorisation;
        // console.log(authHeader);
        if(authHeader){
            const token = authHeader.split(' ')[1];
            const user = await jwt.verify(token,key)
            req.user = user
            next()
        } else res.sendStatus(401)

    }

}

module.exports = {...jwtController}