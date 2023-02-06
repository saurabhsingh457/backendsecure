const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")


const authorise=(roleuser)=>{
    return(req,res,next)=>{
        const user=req.headers.userrole
        if(roleuser.includes(user)){
            next()
        }else{
            res.send("not authrise")
        }
    }
    
}

module.exports={authorise}