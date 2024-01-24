const jwt  = require('jsonwebtoken')
const key = "uhvadnkjcsm;sgjksfhbvnkjdlmksndhbskjfvmlsdk"
const jwtController = {
    create :async(req,res) => {
        const{email,username} =req.body
        if(email) {
            const token = jwt.sign({ email },key)
            res.cookie("jwtCookie",token,{expiresIn : "2d"})
            return token
        }
        if(username) {
            const token = jwt.sign({username},key)
            res.cookie("jwtCookie",token,{expiresIn : "2d"})
            return token
        }
        
    },
    verify : async(req,res)=>{

    }

}