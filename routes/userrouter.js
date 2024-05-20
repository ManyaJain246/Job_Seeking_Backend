import express from 'express'
import {login, register, logout, getuser} from "../controllers/usercontroller.js";
import {isauth} from "../middlewares/auth.js"

const router=express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/logout",isauth, logout)
router.get("/getuser",isauth, getuser)



export default router;