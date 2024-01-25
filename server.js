require('./connection/initialisation')
const express = require('express')
const userRouter = require('./routers/userRouter')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next()
})

app.use('/api',userRouter)

app.listen(400,()=>console.log(400))