const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    pass:String,
    email:String,
    role:{type:String,enum:["manager","emp"]}
})

const UserModel=mongoose.model("users",userSchema)

module.exports={UserModel}