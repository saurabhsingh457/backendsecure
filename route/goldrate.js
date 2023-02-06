const express=require("express")

const goldRoute=express.Router()

const {authenticate}=require("../middleware/authenticate.middle")
goldRoute.use(authenticate)

goldRoute.get("/goldrate",(req,res)=>{
    res.send("this is goldrate")
    console.log("gold rate")
})

module.exports={goldRoute}
