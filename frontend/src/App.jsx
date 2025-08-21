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



































// import './output.css'
// import {Link, Route, Routes} from "react-router-dom"
// import DashBoard from './pages/dashboard'
// import BuildingDetail from './components/BuildingDetail'

// function App() {
//   return <>
//       <div className='text-center py-2 rounded-lg shadow-lg bg-gray-500'>
//       <nav className='shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50'>

//         <Link to="/" className='text-xl font-bold text-gray-800'>Smart-Campus</Link>

//         <ul className="flex ml-6 gap-4 text-sm font-medium items-center">
//             <li>
//               <Link to="/dashboard" className="px-4 py-2 hover:text-gray-400 transition">
//                 DashBoard
//               </Link>
//             </li>
//             <li>
//               <Link to="/login" className="px-4 py-2 hover:text-gray-400 transition">
//                 Login
//               </Link>
//             </li>
            
//             <li>
//               <Link to="/register" className="px-4 py-2 hover:text-gray-400 transition">
//                 Register
//               </Link>
//             </li>
            
//         </ul>

//       </nav>
//     </div>
//     <div>
//         <Routes>
//           <Route path='/dashboard' element={<DashBoard/>}/>
//           <Route path='/building-detail/:id' element={<BuildingDetail/>}/>
//         </Routes>
//     </div>
//   </>

  
// }



// export default App

