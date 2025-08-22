import SensorReading from "../models/sensorReading.js"


const generateReadings=()=>{
        console.log("generating reading starts")
        const buildings=["B1","B2","B3"]
        setInterval(async () => {
        for (let b of buildings) {
            
            const reading = new SensorReading({
                buildingId:b,
                sensors:{
                    Lighting:Number((Math.random()*50).toFixed(1)),
                    HVAC:Number((Math.random()*100).toFixed(1)),
                    Equipment:Number((Math.random()*80).toFixed(1)),
                }
            })
        



            await reading.save();
            console.log(`Saved data for ${b}:`, reading.sensors);
        }
        }, 60000)


       
}

export default generateReadings