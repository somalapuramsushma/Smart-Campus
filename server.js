import express from "express"
import dotenv from "dotenv"
import dbConfig from "./config/mongoDb.js"
import cors from "cors"


const app= express()
app.use(cors());
app.use(express.json())


dotenv.config()
dbConfig()

app.get('/', (req, res) => {
  res.send("Smart Campus API running...");
});


app.listen(process.env.PORT,()=>{
    console.log("Express Server is now running on Port: ",process.env.PORT)
})