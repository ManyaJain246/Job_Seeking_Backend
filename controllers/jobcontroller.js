import {catchasyncerror} from "../middlewares/catchasyncerrors.js";
import Errorhandler from "../middlewares/error.js";
import {Job} from "../models/jobschema.js"

export const getalljobs=catchasyncerror(async(req, res, next)=>{
    const jobs=await Job.find({expired:false});
    res.status(200).json({
        success:true,
        jobs,
    })
})

export const postjobs=catchasyncerror(async(req, res, next)=>{
   const {role}=req.user;
// const role=req.user.role    
if(role==="Job Seeker"){
    return next(
        new Errorhandler("job seeker is not allowed to access this resource", 400)
    )
}

const {title, description, category, country, city, location, fixedsalary, salaryfrom, salaryto} =req.body;
if(!title || !description || !category || !country || !city || !location){
    return next(
        new Errorhandler("please provide complete information", 400)
    )
}

if((!salaryfrom || !salaryto) && !fixedsalary){
    return next(
        new Errorhandler("please provide either fixed salary or ranges salary")
    )
}

if(salaryfrom && salaryto && fixedsalary){
    return next(
        new Errorhandler("fixed salary and ranges salary cannot be provided together")
    )
}

const postedby=req.user._id;
const job= await Job.create({
    title, description, category, country, city, location, fixedsalary, salaryfrom, salaryto,postedby
})

res.status(200).json({
    success:true,
    message:"job posted successfully",
    job,
})
})

export const getmyjobs=catchasyncerror(async(req, res, next)=>{
    const {role}=req.user;
    if(role==="Job Seeker"){
        return next(
            new Errorhandler("job seeker is not allowed to access this resource", 400)
        )
    }
    
    const myjobs=await Job.find({postedby:req.user._id});
    res.status(200).json({
        success:true,
        myjobs,
    })
})

export const updatejobs=catchasyncerror(async(req, res, next)=>{
    const {role}=req.user;
    if(role==="Job Seeker"){
        return next(
            new Errorhandler("job seeker is not allowed to access this resource", 400)
        )
    }

    const {id}=req.params
    let job=await Job.findById(id);
    if(!job){
        return next(
            new Errorhandler("Job doesn't exist anymore", 404)
        )
    }

    job=await Job.findByIdAndUpdate(id, req.body, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        job,
        message:"job updated successfully"
    })
})

export const deletejobs=catchasyncerror(async(req, res, next)=>{
    const {role}=req.user;
    if(role==="Job Seeker"){
        return next(
            new Errorhandler("job seeker is not allowed to access this resource", 400)
        )
    }

    const {id}=req.params
    let job=await Job.findById(id);
    if(!job){
        return next(
            new Errorhandler("Job doesn't exist anymore", 404)
        )
    }

    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"job deleted successfully!"
    })

})

export const getsinglejob=catchasyncerror(async(req, res, next)=>{
    const {id}=req.params;
    try{
        const job=await Job.findById(id);
        if(!job){
            return next(
                new Errorhandler("Job not found", 404)
            )
        }

        res.status(200).json({
            success:true,
            job,
        })

    }catch(error){
      return next(
        new Errorhandler(`Invalid Id / Cast error`, 404)
      )
    }
})