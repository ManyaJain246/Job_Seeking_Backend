import { catchasyncerror } from "../middlewares/catchasyncerrors.js";
import Errorhandler from "../middlewares/error.js";
import {Application} from "../models/applicationschema.js";
import { Job } from "../models/jobschema.js";
import cloudinary from "cloudinary";
// import "../server.js";


export const postapplication=catchasyncerror(async(req, res, next)=>{
    const {role}=req.user;
    if(role==="Employer"){
        return next(
            new Errorhandler("Employer is not allowed to access this resource", 400)
        )
    }

    if(!req.files || Object.keys(req.files).length===0){
        return next(
            new Errorhandler("resume file required")
        )
    }

    const {resume}=req.files;
    const allowedformats=["image/png", "image/jpeg", "image/webp"]
    if(!allowedformats.includes(resume.mimetype)){
        return next(
            new Errorhandler("Invalid file type", 400)
        )
    }

    

    const cloudinaryresponse=await cloudinary.uploader.upload(
        resume.tempFilePath
    );

    if(!cloudinaryresponse || cloudinaryresponse.error){
        console.error("cloudinary error", cloudinaryresponse.error || "unknown cloudinary error")
        return next ("failed to upload resume", 500)
    }

    const {name, email, coverletter, phone, address, jobid}=req.body;
    const applicantid={
        user:req.user._id,
        role:"Job Seeker"
    }

    if(!jobid){
        return next(
            new Errorhandler("job not found", 404)
        )
    }

    const jobdetails=await Job.findById(jobid);
    if(!jobdetails){
        return next(
            new Errorhandler("job not found", 404)
        )
    }

    const employerid={
        user:jobdetails.postedby,
        role:"Employer"
    }

    if(!name || !email || !coverletter || !phone || !address || !applicantid || !employerid || !resume){
        return next(
            new Errorhandler("please fill all field", 404)
        )
    }

    const application=await Application.create({
        name, 
        email,
        coverletter, 
        phone, 
        address, 
        applicantid, 
        employerid, 
        resume:{
            public_id:cloudinaryresponse.public_id,
            url:cloudinaryresponse.secure_url,
        }
    })

    res.status(200).json({
        success:true,
        message:"Application submitted successfully",
        application
    })
})


export const employergetapplications=catchasyncerror(async(req, res, next)=>{
    const {role}=req.user;
    if(role==="Job Seeker"){
        return next(
            new Errorhandler("job seeker is not allowed to access this resource", 400)
        )
    }

    const {_id}=req.user;
    const applications=await Application.find({"employerid.user":_id});
    res.status(200).json({
        successs:true,
        applications,
    })
})


export const jobseekergetapplications=catchasyncerror(async(req, res, next)=>{
    const {role}=req.user;
    if(role==="Employer"){
        return next(
            new Errorhandler("Employer is not allowed to access this resource", 400)
        )
    }

    const {_id}=req.user;
    const applications=await Application.find({"applicantid.user":_id});
    res.status(200).json({
        successs:true,
        applications,
    })
})


export const jobseekerdeleteapplications=catchasyncerror(async(req, res, next)=>{
    const {role}=req.user;
    if(role==="Employer"){
        return next(
            new Errorhandler("Employer is not allowed to access this resource", 400)
        )
    }

    const {id}=req.params;
    const application=await Application.findById(id);
    if(!application){
        return next(
            new Errorhandler("application not found!", 404)
        )
    }

    await application.deleteOne();
    res.status(200).json({
        successs:true,
        message:"application deleted successfully"
    })
});