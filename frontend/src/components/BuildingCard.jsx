import { useEffect , useState} from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function BuildingCard({buildingId}){

    const [todaysData,setTodaysData]=useState([])
    
    const [yesterdaysData,setYesterdaysData]=useState([])

    const today= new Date().toISOString().split("T")[0]
    const yesterday=new Date(today)
    yesterday.setDate(yesterday.getDate()-1)
    console.log(today,yesterday)
    useEffect(()=>{
        if(buildingId){
            axios.get(`http://localhost:5000/api/buildings/${buildingId}/daily-usage?date=${today}`)
            .then((response)=>{setTodaysData(response.data.hours)})
            .catch((error)=>{console.log(error)})

            axios.get(`http://localhost:5000/api/buildings/${buildingId}/daily-usage?date=${yesterday}`)
            .then((response)=>{setYesterdaysData(response.data.hours)})
            .catch((error)=>{console.log(error)})
        }
    },[buildingId])

    const calculateUsage=(arr)=>{
        const sum= arr.reduce((acc,cv)=>{
            return acc+(cv.Lighting||0)+(cv.HVAC||0)+(cv.Equipment||0)
        },0)

        return sum
    }

    return <>
        <Link to={`/building-details/${buildingId} `}>
            <h3>Building-{buildingId}</h3>
            <p>Todays Usage: {calculateUsage(todaysData).toFixed(2)}</p>
            <p>Trends: {(((calculateUsage(todaysData)-calculateUsage(yesterdaysData))/calculateUsage(yesterdaysData))*100).toFixed(1)}% usage than yesterday</p>


        </Link>
    </>
}