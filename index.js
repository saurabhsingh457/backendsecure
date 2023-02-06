const express=require('express')
const app=express()
const {connection}=require("./config/config")

app.use(express.json())
require("dotenv").config()


const {userRouter}=require("./route/user.route")
app.use("/user",userRouter)

const {goldRoute}=require("./route/goldrate")
app.use("/",goldRoute)

const {userstateRoute}=require("./route/userstat")
app.use("/",userstateRoute)

app.get("/",(req,res)=>{
    res.send("hello")
    console.log("hello")
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
    console.log("server running")
})