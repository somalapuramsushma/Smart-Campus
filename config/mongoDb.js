import mongoose from "mongoose";
import generateReadings from "../controllers/genRandomReadings.js";
import SensorReading from "../models/sensorReading.js";

const dbConfig=()=>{
    mongoose.connect(process.env.DB_URI)
    .then(async()=>{
        console.log("DB is now connected")
        await SensorReading.syncIndexes()
        console.log("indexes synced")
        const countDocuments= await SensorReading.countDocuments()
        if(countDocuments<200){
            
            generateReadings()
        }

        
    
    })
    .catch((err)=>{
        console.log(err)
    })

}

export default dbConfig