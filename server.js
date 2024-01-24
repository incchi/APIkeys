require('./connection/initialisation')
const express = require('express')
const userRouter = require('./routers/userRouter')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next()
})

app.use('/api',userRouter)

app.listen(400,()=>console.log(400))