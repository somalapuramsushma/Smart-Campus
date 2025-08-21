import express from "express"
import dotenv from "dotenv"
import dbConfig from "./config/mongoDb.js"
import cors from "cors"
import readingsContoller from "./controllers/readingsController.js"

const app= express()
app.use(cors());
app.use(express.json())


dotenv.config()
dbConfig()

app.get('/', (req, res) => {
  res.send("Smart Campus API running...");
});

app.post("/api/addReadings",readingsContoller.postData)

app.get("/api/buildings",readingsContoller.listBuildings)

app.get("/api/buildings/:buildingId/daily-usage",readingsContoller.dailyUsage)

app.get("/api/buildings/:buildingId/summary",readingsContoller.summary)

app.listen(process.env.PORT,()=>{
    console.log("Express Server is now running on Port: ",process.env.PORT)
})