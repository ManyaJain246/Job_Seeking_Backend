import express from 'express'
import {getalljobs, postjobs, getmyjobs, updatejobs, deletejobs, getsinglejob} from "../controllers/jobcontroller.js";
import {isauth} from "../middlewares/auth.js"
const router=express.Router();


router.get("/getall", getalljobs)
router.post("/post", isauth, postjobs)
router.get("/getmyjobs", isauth, getmyjobs)
router.put("/updatejobs/:id", isauth, updatejobs)
router.delete("/delete/:id", isauth, deletejobs)
router.get("/:id", isauth, getsinglejob)

export default router;