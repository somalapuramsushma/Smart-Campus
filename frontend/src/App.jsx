import {Link, Route, Routes} from "react-router-dom"
import Dashboard from "./pages/dashboard"
import BuildingDetails from "./components/BuildingDetail"
export default function App(){
  return <>
    
    <nav className="flex items-center justify-between sticky top-0 z-50">
      <h3 className="font-bold" >Smart Campus Energy Monitoring System</h3>

      <ul className="flex ml-6 gap-4 text-sm font-medium items-center">
        <li>
          <Link to="/dashboard" >Dashboard</Link>
        </li>
      </ul>
    </nav>

    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/building-details/:buildingId" element={<BuildingDetails/>}/>
    </Routes>
  </>
}































