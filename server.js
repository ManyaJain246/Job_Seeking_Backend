import app from "./app.js"
import cloudinary from "cloudinary"
cloudinary.v2.config({
    cloud_name:process.env.cloudinary_user_name,
    api_key:process.env.cloudinary_user_api,
    api_secret:process.env.cloudinary_user_secret,
});


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})

// export default cloudinary