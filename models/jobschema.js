import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true, "please provide job title"]
    },

    description:{
        type:String,
        required:[true, "please provide job description"]
    },

    category:{
        type:String,
        required:[true, "job category is required"]
    },

    country:{
        type:String,
        required:[true, "job country is required"]
    },

    city:{
        type:String,
        required:[true, "job city is required"]
    },

    location:{
        type:String,
        required:[true, "job location is required"]
    },

    fixedsalary:{
        type:Number,
        minLength:[4, "salary must contain atleast 4 numbers"],
        maxLength:[9, "salary cannot be greater than 9 digits"]
    },

    salaryfrom:{
        type:Number,
        minLength:[4, "salary must contain atleast 4 numbers"],
        maxLength:[9, "salary cannot be greater than 9 digits"]
    },

    salaryto:{
        type:Number,
        minLength:[4, "salary must contain atleast 4 numbers"],
        maxLength:[9, "salary cannot be greater than 9 digits"]
    },

    expired:{
        type:Boolean,
        default:false
    },

    postedon:{
        type:Date,
        default:Date.now
    },

    postedby:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true

    }
});

export const Job=mongoose.model("Job", jobSchema)