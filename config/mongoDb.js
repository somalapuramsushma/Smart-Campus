import mongoose from "mongoose";

const dbConfig=()=>{
    mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log("DB is now connected")
    })
    .catch((err)=>{
        console.log(err)
    })
}

export default dbConfig