import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const BuildingContext= createContext()


export function BuildingContextProvider(props){

    const [buildings,setBuildings]=useState([])
    const [buildingsReadings,setBuildingsReadings]=useState({"B1":[],"B2":[],"B3":[]})

    const getReadingsOfBuilding=async(buildingId)=>{
        try{
            const dateToday= new Date().toISOString
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










// import { createContext, useState } from "react";
// import axios from "axios"

// export const BuildingContext= createContext()


// export function BuildingContextProvider(props){
    
//     const [building,setBuildings]=useState(["B1","B2","B3"])
//     const [dailyReadings,setDailyReadings]=useState({
//         B1:{},
//         B2:{},
//         B3:{}
//     })

//     const today = new Date().toISOString().split("T")[0]
//     const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]
    
//     const getDailyReadingsOfBuilding=async(buildingId)=>{
        
//         try{
//             const readingsOfBuildingToday= await axios.get(`http://localhost:5000/api/buildings/${buildingId}/daily-usage?date=${today}`)
//             const readingsOfBuildingYesterday= await axios.get(`http://localhost:5000/api/buildings/${buildingId}/daily-usage?date=${yesterday}`)
//             const readingsToday=readingsOfBuildingToday.data.hours
//             const readingsYesterday=readingsOfBuildingYesterday.data.hours
//             setDailyReadings((prev) => ({ ...prev, [buildingId]: {readingsToday,readingsYesterday} }))


//         }
//         catch(err){
//             console.log(err)
//         }
//     }
//     return <div>
//         <BuildingContext.Provider value={{dailyReadings,getDailyReadingsOfBuilding,building}}>
//             {props.children}
//         </BuildingContext.Provider>
//     </div>
// }