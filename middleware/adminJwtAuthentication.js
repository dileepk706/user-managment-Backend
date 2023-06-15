require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY_ADMIN;

exports.verifyToken=(req,res,next)=>{

    const token=req.headers.authorization?.split(' ')[1]
    if(!token){
        res.status(401).json({message:'No token provided'})
        return
    }

    //verify jwt token
    jwt.verify(token,secret,(err,decoded)=>{
        if(err){
            res.status(403).json({message:'Failed to authenticate token'})
            return
        }
        req.admin={
            id:decoded.user._id,
            name:decoded.user.name,
            email:decoded.user.email,
            isAdmin:decoded.user.isAdmin
        }
        next()
    })
 
}

exports.isAdmin=async(req,res)=>{

    const token=req.headers.authorization?.split(' ')[1]
    if(!token){
        res.status(401).json({admin:false})
        return
    }

    //verify jwt token
    jwt.verify(token,secret,(err,decoded)=>{
        if(err){
            res.status(403).json({admin:false})
            return
        }
        res.status(200).json({admin:true})
        
    })
 
}