import mongoose, { model } from "mongoose";

const sensorReadingSchema= new mongoose.Schema({
    buildingId:{
        type:String,
        enum: ["B1", "B2", "B3"],
        required: true

    },
    sensors: {
        Lighting: {
            type:Number,
            required:true
        },
        HVAC: {
            type:Number,
            required:true
        },
        Equipment: {
            type:Number,
            required:true
        }
    }
},{timestamps:true})

sensorReadingSchema.index({buildingId:1,createdAt:-1})

const SensorReading= model("SensorReading",sensorReadingSchema)

export default SensorReading