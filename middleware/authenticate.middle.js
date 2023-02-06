const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const cookieParser = require('cookie-parser');
const fs = require('fs');
const { request } = require('http');

const authenticate=(req,res,next)=>{
    const token=req.headers.normaltoken
    const data=JSON.parse(fs.readFileSync("./blacklist.json","utf-8"))
    if(data.includes(token)){
        res.send("login again ")
    }else{
        if(token){
            const decoded=jwt.verify(token,process.env.normalkey)
            if(decoded){
                const userrole=decoded.role
                req.headers.userrole=userrole
                next()
            }else{
                res.send("again login")
            }
        }else{
            res.send("again login")
        }
    }
}
module.exports={authenticate}