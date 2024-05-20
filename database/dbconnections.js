import mongoose from "mongoose"

export const dbconnections=()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbname:"JOB_SEEKING"
    }).then(()=>{
        console.log("connected to database")
    }).catch((err)=>{
        console.log(`some error occurred ${err}`)
    })
    }
