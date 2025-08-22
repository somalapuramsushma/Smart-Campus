import {useParams} from "react-router-dom"
import ChartComponent from "./chartComponent"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { BuildingContext } from "../context/buildingsContext"
export default function BuildingDetails()
{
    const {buildingId}=useParams()
    const [summary7days,setSummaryDays]=useState(null)
    const [dailyUsagePerHour,setDailyUsagePerHour]=useState(null)
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

            const interval = setInterval(fetchSummary, 30000);

    
            return () => clearInterval(interval);
        }
        
    },[buildingId])

    useEffect(()=>{
        if(buildingId){
            const todaysUsagePerHour= async()=>{
                try {
                    const res= await axios.get(`http://localhost:5000/api/buildings/${buildingId}/daily-usage`)
                    if(res){
                        setDailyUsagePerHour({
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

            const interval = setInterval(todaysUsagePerHour, 30000);

    
            return () => clearInterval(interval);
        }
    },[buildingId])

    useEffect(()=>{
        if(dailyUsagePerHour){
            const sensorSetting=()=>{
                
                const lighting=dailyUsagePerHour?.lighting?.reduce((a, b) => a + b, 0)
                const hvac=dailyUsagePerHour?.hvac?.reduce((a, b) => a + b, 0)
                const eqm=dailyUsagePerHour?.equipment?.reduce((a, b) => a + b, 0)

                const total=lighting+hvac+eqm
                setSensorBreakdown({lighting:(lighting/total)*100,hvac:(hvac/total)*100,equipment:(eqm/total)*100})
            }
            sensorSetting()
            const interval = setInterval(sensorSetting, 30000);

    
            return () => clearInterval(interval);
        }
    },[dailyUsagePerHour])

    if(!buildingId) return <p>Loading</p>
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
                dailyUsagePerHour?<>
                <ChartComponent
                    title="Todays usage Per Hour"
                    type="line"
                    categories={dailyUsagePerHour.hours}
                    series={[
                        { name: "Lighting", data: dailyUsagePerHour.lighting, color: "#f7a35c" },
                        { name: "HVAC", data: dailyUsagePerHour.hvac, color: "#7cb5ec" },
                        { name: "Equipment", data: dailyUsagePerHour.equipment, color: "#90ed7d" }
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

        <br/><br/>

        <section className="mt-8 p-6 bg-gray-100 rounded-xl shadow-md text-left max-w-2xl mx-auto">
            <h2 className="font-bold text-lg mb-4">Insights</h2>
            {summary7days && dailyUsagePerHour && sensorBreakdown ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                    Over the last 7 days, <strong>
                    {summary7days.LightingAvg > summary7days.HVACAvg && summary7days.LightingAvg > summary7days.EquipmentAvg
                    ? "Lighting"
                    : summary7days.HVACAvg > summary7days.EquipmentAvg
                    ? "HVAC"
                    : "Equipment"}
                    </strong> consumed the most energy on average.
                </li>
                <li>
                    Todays peak usage was around{" "}
                    <strong>
                    {dailyUsagePerHour.hours[
                        dailyUsagePerHour.lighting.indexOf(
                        Math.max(...dailyUsagePerHour.lighting)
                        )
                    ]}
                    </strong>{" "}
                    for Lighting.
                </li>
                <li>
                    HVAC accounted for <strong>{sensorBreakdown.hvac.toFixed(1)}%</strong> of today's total consumption.
                </li>
                <li>
                    Total usage today ={" "}
                    <strong>
                    {dailyUsagePerHour.lighting.reduce((a, b) => a + b, 0) +
                        dailyUsagePerHour.hvac.reduce((a, b) => a + b, 0) +
                        dailyUsagePerHour.equipment.reduce((a, b) => a + b, 0)}{" "}
                    kWh
                    </strong>
                </li>
                </ul>
            ) : (
                <p>Loading insights...</p>
            )}
            </section>

    </div>
}
