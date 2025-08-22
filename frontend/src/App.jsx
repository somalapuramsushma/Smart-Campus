import {Link, Route, Routes} from "react-router-dom"
import Dashboard from "./pages/dashboard"
import BuildingDetails from "./components/BuildingDetail"

export default function App(){
  return <div >
    
    <nav className="flex items-center justify-between bg-blue-500 !important  px-6 py-3 shadow-md sticky top-0 z-50">
      <Link to="/" className="font-bold" >Smart Campus Energy Monitoring System</Link>

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
  </div>
}































