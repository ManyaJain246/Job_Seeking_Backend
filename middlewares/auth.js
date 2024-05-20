import {catchasyncerror} from "./catchasyncerrors.js";
import Errorhandler from "./error.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.js"

export const isauth=catchasyncerror(async(req, res, next)=>{
const {token}=req.cookies
if(!token){
    return next(new Errorhandler("user not authorised", 400))
}
const decoded=jwt.verify(token, process.env.JWT_SECRET_KEY)
req.user=await User.findById(decoded.id)
next();
})

