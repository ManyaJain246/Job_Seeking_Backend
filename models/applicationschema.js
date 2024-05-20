import mongoose from "mongoose";
import validator from "validator"

const applicationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:[true, "please provide your email address"],
        validator:[validator.isEmail, "please provide a valid email"]
    },

    coverletter:{
        type:String,
        required:true
    },

    phone:{
        type:Number,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    resume:{
        public_id:{
            type:String,
            required:true
        },

        url:{
            type:String,
            required:true
        }
    },

    applicantid:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        role:{
            type:String,
            enum:["Job Seeker"],
            required:true
        }
    },

    employerid:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        role:{
            type:String,
            enum:["Employer"],
            required:true
        }
    }
});

export const Application=mongoose.model("Application", applicationSchema)