import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const BuildingContext= createContext()


export function BuildingContextProvider(props){

    const [buildings,setBuildings]=useState([])
    const [buildingsReadings,setBuildingsReadings]=useState({"B1":[],"B2":[],"B3":[]})

    const getReadingsOfBuilding=async(buildingId)=>{
        try{
            const dateToday=new Date().toISOString().split("T")[0];
            const response= await axios.get(`http://localhost:5000/api/buildings/${buildingId}/daily-usage?date=${dateToday}`)
            setBuildingsReadings((prev)=>({...prev,[buildingId]:response.hours}))

        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        axios.get("http://localhost:5000/api/buildings")
        .then((res)=>{
            setBuildings(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    
    return <>
        <BuildingContext.Provider value={{buildings,buildingsReadings,getReadingsOfBuilding}}>
            {props.children}
        </BuildingContext.Provider>
    </>
}



