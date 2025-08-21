import {useParams} from "react-router-dom"
import ChartComponent from "./chartComponent"
import { useEffect, useState } from "react"
import axios from "axios"
export default function BuildingDetails()
{
    const {buildingId}=useParams()
    const [summary7days,setSummaryDays]=useState(null)
    const [dailyUsagePerDay,setDailyUsagePerDay]=useState(null)
    const [sensorBreakdown,setSensorBreakdown]=useState(null)

    useEffect(()=>{
        if(buildingId){
            const fetchSummary= async()=>{
                try{
                    
                    const summaryReading= await axios.get(`http://localhost:5000/api/buildings/${buildingId}/summary`)
                    if(summaryReading){
                        
                        setSummaryDays(summaryReading.data)
                    }
                }
                catch(error){
                    console.log(error)
                }

            }
            fetchSummary()
        }
        
    },[buildingId])

    useEffect(()=>{
        if(buildingId){
            const todaysUsagePerHour= async()=>{
                try {
                    const res= await axios.get(`http://localhost:5000/api/buildings/${buildingId}/daily-usage`)
                    if(res){
                        setDailyUsagePerDay({
                            hours: res.data.hours.map(h => `${h.hour}:00`),   
                            lighting: res.data.hours.map(h => h.Lighting),   
                            hvac: res.data.hours.map(h => h.HVAC),          
                            equipment: res.data.hours.map(h => h.Equipment)  
                        });

                    }

                } catch (error) {
                    console.log(error)
                }
            }
            todaysUsagePerHour()
        }
    },[buildingId])

    useEffect(()=>{
        if(dailyUsagePerDay){
            const sensorSetting=()=>{
                
                const lighting=dailyUsagePerDay?.lighting?.reduce((a, b) => a + b, 0)
                const hvac=dailyUsagePerDay?.hvac?.reduce((a, b) => a + b, 0)
                const eqm=dailyUsagePerDay?.equipment?.reduce((a, b) => a + b, 0)

                const total=lighting+hvac+eqm
                setSensorBreakdown({lighting:(lighting/total)*100,hvac:(hvac/total)*100,equipment:(eqm/total)*100})
            }
            sensorSetting()
        }
    },[dailyUsagePerDay])
    console.log(sensorBreakdown)
    if(!buildingId) return <p>Locading</p>
    return <div className="py-6 text-center">
        <h1 className="font-bold">Building-{buildingId}</h1>
        <br/><br/>
        <h3 className="font-bold">Details:</h3>
        <br/><br/>
        <section>
            <ChartComponent
                title="Summary of energy usage last 7 days"
                type="column"
                categories={["Lighting","HVAC","Equipment"]}
                series={[
                    {
                        name: "Avg Consumption",
                        colorByPoint: true,
                        data: [
                        { name: "Lighting", y: summary7days?.LightingAvg ||0},
                        { name: "HVAC", y: summary7days?.HVACAvg || 0},
                        { name: "Equipment", y: summary7days?.EquipmentAvg || 0 }
                        ]
                    }
                ]}
            />
        </section>

        <section>
            {
                dailyUsagePerDay?<>
                <ChartComponent
                    title="Todays usage Per Hour"
                    type="line"
                    categories={dailyUsagePerDay.hours}
                    series={[
                        { name: "Lighting", data: dailyUsagePerDay.lighting, color: "#f7a35c" },
                        { name: "HVAC", data: dailyUsagePerDay.hvac, color: "#7cb5ec" },
                        { name: "Equipment", data: dailyUsagePerDay.equipment, color: "#90ed7d" }
                    ]}
                />
                </>:<><p>loading</p></>
            }

        </section>


        <br/><br/>

        <section>
            {sensorBreakdown?<>
                <ChartComponent
                    title="Sensor Usage Break down of today"
                    type="pie"
                    categories={[]}
                    series={[
                                {
                                    name: "Consumption %",
                                    colorByPoint: true,
                                    data: [
                                    { name: "Lighting", y: sensorBreakdown.lighting || 0 },
                                    { name: "HVAC", y: sensorBreakdown.hvac || 0 },
                                    { name: "Equipment", y: sensorBreakdown.equipment|| 0 },
                                    ],
                                },
                    ]}
                />
            </>:<><p>loading</p></>}
        </section>
    </div>
}
