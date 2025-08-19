import express from "express"
import dotenv from "dotenv"
import dbConfig from "./config/mongoDb.js"

const app= express()
dotenv.config()
dbConfig()

app.listen(process.env.PORT,()=>{
    console.log("Express Server is now running on Port: ",process.env.PORT)
})