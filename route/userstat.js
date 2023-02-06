const express=require("express")

const {authorise}=require("../middleware/authorize.middleware")

const userstateRoute=express.Router()

userstateRoute.get("/change",authorise(["manager"]),(req,res)=>{
    res.send("your r manger and visit it")
})

module.exports={userstateRoute}