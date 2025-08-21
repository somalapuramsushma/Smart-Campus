import { useContext } from "react"
import { BuildingContext } from "../context/buildingsContext"
import BuildingCard from "./BuildingCard"

export default function Overview(){
    
    const {buildings}=useContext(BuildingContext)

    return <>
        
        
        <section className="border-width-4 border-red-500  rounded-xl shadow-lg p-6">
            <h3 className="py-4 font-medium">Overview:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
                {buildings.map((b)=>{
                return <BuildingCard key={b} buildingId={b} />})}
            </div>
            
        </section>
        
    </>
}

