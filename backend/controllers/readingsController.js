import SensorReading from "../models/sensorReading.js"
import { BUILDINGS } from "../utils/constants.js"

//to filter based on date, start date to end date is calculated and returned
function dateRangeForDay(dateStr) {

    const date = dateStr ? new Date(dateStr) : new Date()

    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    const end = new Date(start)
    end.setDate(end.getDate() + 1);


    return { start, end };
}


const readingsContoller={}

//List all buildings as array
readingsContoller.listBuildings=async(req,res)=>{
    const buildings =BUILDINGS;
    res.json(buildings);
}

//a function that takes BuildingId and date Query from req obj 
// and returns sensor readings with 
// filter based on buildinId and date for sensor readings,
//project them as {hour:0,Lighting,HVAC,Equipment} reading
readingsContoller.dailyUsage=async(req,res)=>{


    try {

        const id = req.params.buildingId;
        const dateQuery = req.query.date; 

        const { start, end } = dateRangeForDay(dateQuery);

        const data = await SensorReading.aggregate([

        { $match: { buildingId: id, createdAt: { $gte: start, $lt: end } } },

        {
            $project: {
            hour: { $hour: "$createdAt" },
                "sensors.Lighting": 1,
                "sensors.HVAC": 1,
                "sensors.Equipment": 1
            }
        },

        {
            $group: {
            _id: "$hour",
            Lighting: { $sum: "$sensors.Lighting" },
            HVAC: { $sum: "$sensors.HVAC" },
            Equipment: { $sum: "$sensors.Equipment" }
            }
        },

        { $sort: { _id: 1 } }

        ]);

        const hours = Array.from({ length: 24 }, (_, h) => {

            const found = data.find(a => a._id === h);

            return {
                hour: h,
                Lighting: found ? found.Lighting : 0,
                HVAC: found ? found.HVAC : 0,
                Equipment: found ? found.Equipment : 0
            };
        });

        console.log(hours)
        res.json({ date: start, hours });

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: 'server error' });

    }
}


//buildingId is extracted from req obj, 
//filters readings of one building=Id, and of date starting from today-7 to today
//now projected as day(YY,MM,DD),Lighting,HVAC,Eq
//group them all based on each date==day, and adding all readings of date to total
//group them all, remove their building id, avg all readings of Lighting,HVAC,Eq,
//include days: but Sum 1 for each date

readingsContoller.summary= async(req,res) =>{
    try {

        const id = req.params.buildingId;

        const now = new Date();

        const start7 = new Date(now);
        start7.setDate(start7.getDate() - 7);

        const data = await SensorReading.aggregate([

        { 
            $match: { buildingId: id, createdAt: { $gte: start7, $lt: now } } 
        },

        {
            $project: {
                day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                Lighting: "$sensors.Lighting",
                HVAC: "$sensors.HVAC",
                Equipment: "$sensors.Equipment"
            }
        },
        {
            $group: {
                _id: "$day",
                LightingTotal: { $sum: "$Lighting" },
                HVACTotal: { $sum: "$HVAC" },
                EquipmentTotal: { $sum: "$Equipment" }
            }
        },
        {
            $group: {
                _id: null,
                LightingAvg: { $avg: "$LightingTotal" },
                HVACAvg: { $avg: "$HVACTotal" },
                EquipmentAvg: { $avg: "$EquipmentTotal" },
                daysCount: { $sum: 1 }
            }
        }
        ]);

        const result = data[0] || { LightingAvg: 0, HVACAvg: 0, EquipmentAvg: 0, daysCount: 0 };
        console.log(result,data)
        res.json({
            lastDays: 7,
            daysCount: result.daysCount,
            LightingAvg: result.LightingAvg || 0,
            HVACAvg: result.HVACAvg || 0,
            EquipmentAvg: result.EquipmentAvg || 0
        });

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: 'server error' });

    }
}

readingsContoller.postData=async(req,res)=>{
    try {

        const { buildingId, sensors } = req.body;

        if (!buildingId || !sensors) {
        return res.status(400).json({ error: 'buildingId and sensors required' });
        }

        const doc = await SensorReading.create({
            buildingId,
            sensors
        });

        return res.status(201).json({ doc: doc });

    } catch (err) {

        console.error(err);
        return res.status(500).json({ error: 'server error' });

    }

}
export default readingsContoller