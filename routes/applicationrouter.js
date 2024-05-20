import express from 'express'
import {postapplication, jobseekergetapplications, employergetapplications, jobseekerdeleteapplications} from "../controllers/applicationcontroller.js";
import {isauth} from "../middlewares/auth.js";


const router=express.Router();

router.get("/jobseeker/getall", isauth, jobseekergetapplications);
router.get("/employer/getall", isauth, employergetapplications);
router.delete("/delete/:id", isauth, jobseekerdeleteapplications);
router.post("/post", isauth, postapplication)




export default router;