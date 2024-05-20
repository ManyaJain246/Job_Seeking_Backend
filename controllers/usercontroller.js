import {catchasyncerror} from "../middlewares/catchasyncerrors.js";
import Errorhandler from "../middlewares/error.js";
import {User} from "../models/user.js";
import {sendtoken} from "../utils/jsonwebtoken.js"

export const register=catchasyncerror(async(req, res, next)=>{
    const{name, email, phone, role, password}=req.body;
    if (!name|| !email|| !phone|| !role|| !password){
        return next(new Errorhandler("Please fill the complete form"))
    }

    const isEmail=await User.findOne({email});
    if(isEmail){
        return next(new Errorhandler("Email already exists"))
    }

    const user=await User.create({
        name,
        email,
        phone,
        role,
        password
    });

    sendtoken(user, 200, res, "user registered successfully!")
});

export const login=catchasyncerror(async(req, res, next)=>{
    const {email, password, role}=req.body;
    if(!email || !password || !role){
        return next(
          new Errorhandler("please provide the details, 400")
          )
    }

    const user=await User.findOne({email}).select("+password")

    if(!user){
        return next(
            new Errorhandler("invalid", 400)
        )
        
    }

    const passwordmatched=await user.comparePassword(password)
    if(!passwordmatched){
        return next(
            new Errorhandler("invalid", 400)
        )
       
    }

    if(user.role!==role){
        return next(
            new Errorhandler("invalid role", 400)
        )
        
    }

    sendtoken(user, 200, res, "user logged in successfully")
});

export const logout=catchasyncerror(async(req, res, next)=>{
    res
    .status(201)
    .cookie("token", "",{
        httpOnly:true,
        expires:new Date(Date.now()),
        secure:true,
        sameSite:"None"
    })
    .json({
        success:true,
        message:"user logged out successfully"
    })
});

export const getuser=catchasyncerror((req, res, next)=>{
    const user=req.user
    res.status(200).json({
        success:true,
        user,
    })
})