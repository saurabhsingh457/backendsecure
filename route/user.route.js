const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const cookieParser = require('cookie-parser');
const fs = require('fs')
const { UserModel } = require("../model/user.model");
const { json } = require('express');

const userRouter = express.Router()
userRouter.use(cookieParser())

userRouter.post("/signup", async (req, res) => {
    try {
        
        const { name, pass, email, role } = req.body
        
        const already = await UserModel.findOne({ email })
        console.log(already)
        if (already) {
            res.send("user already exists")
        }
        else {
            
                bcrypt.hash(pass, 5, async (err, hashpass) => {
                    if (err) {
                        res.send("error while hashing password")
                    } else {
                        const user = await UserModel.insertMany({ name, pass: hashpass, email, role })
                        // user.save()
                        res.send("registered successfully")
                        // console.log(user)
                    }
                })
           
        }
    } catch (error) {
        console.log(error)
    }
})
userRouter.post("/login", async (req, res) => {
    const { name, pass, email } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
        res.send("user does not exist")
    } else {
        bcrypt.compare(pass, user.pass, async (err, result) => {
            if (err) {
                res.send("wrong credentials")
            } else {
                if (result) {
         var normaltoken = jwt.sign({ userId: user._id, role: user.role }, process.env.normalkey, { expiresIn: "1h" });
      var refreshtoken = jwt.sign({ userId: user._id, role: user.role }, process.env.refreshkey, { expiresIn: "7d" });
 res.cookie("normaltoken", normaltoken, { httpOnly: true, maxAge: 1000000 }).cookie("refreshtoken", refreshtoken, { httpOnly: true,maxAge: 100000 })
                    res.send("logged in successfully")
                } else {
                    res.send("wrong credential")
                }
            }
        })
    }
})
userRouter.post("/newtoken", (req, res) => {
    try {
        const newtoken = req.cookies.refreshtoken
        // console.log(newtoken)

        if (!newtoken) {
            res.send("no token")
        } else {
            jwt.verify(newtoken, process.env.refreshkey, (err, decoded) => {
                if (err) {
                    res.send("invalid token")
                } else {

 var normaltoken = jwt.sign({ userId: decoded.userId, role: decoded.role }, process.env.normalkey, { expiresIn: "1h" });
 res.cookie("normaltoken", normaltoken, { httpOnly: true, maxAge: 1000000 }).cookie("refreshtoken", newtoken, { httpOnly: true, maxAge: 100000})
                    res.send("new token generated successfully")
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
})
userRouter.get('/logout', (req, res) => {
    res.send("logout successfully")
      console.log("logout successfully")
    let kk = req.cookies.normaltoken
    let fil = fs.readFileSync("./blacklist.json", "utf-8")
    let data = JSON.parse(fil)
    //   console.log(kk)
    data.push(kk)
    fs.writeFileSync("./blacklist.json", JSON.stringify(data))

    res.clearCookie("normaltoken").clearCookie("refreshtoken")
})
module.exports = { userRouter }