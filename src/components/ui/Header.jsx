import React from 'react'
import { FaPlus } from "react-icons/fa";
import { useNavigate,useLocation,NavLink } from 'react-router-dom';
import Searchbar from './Searchbar';
import { SiThestorygraph } from "react-icons/si";
import { FaHome } from "react-icons/fa";


const Header = () => {
  const navigate = useNavigate();
  const path = useLocation();
  console.log(path.pathname)

  return (
     <header className="flex justify-around p-2 items-center bg-[#EEF4FF] rounded-lg shadow-md mb-4">
          <div className=" w-[30%]">
            <img src="./logo.svg" className="" alt="" />
          </div>
          <div className="w-[30%]">
            <Searchbar />
          </div>
          
            <NavLink to="/home"  className={({isActive}) => `cursor-pointer text-[#8B5CF6] font-semibold flex items-center gap-1 hover:shadow-md rounded-lg p-1 ${isActive ? 'text-[#8B5CF6] underline' : ''}`}><FaHome />Home</NavLink>
        
          
          <NavLink to="/dashboard" className={({isActive}) => `cursor-pointer text-[#8B5CF6] font-semibold flex items-center gap-1 hover:shadow-md rounded-lg p-1 ${isActive ? 'text-[#8B5CF6] underline' : ''}`}>
            <SiThestorygraph />
            Go to Dashboard
          </NavLink>
          {path.pathname !== "/form" && (
            <button onClick={()=>navigate("/form")} className="bg-[#8B5CF6] text-[#EEF4FF] rounded-sm px-1 p-1 flex gap-1 items-center">
            <FaPlus /> New Submission
          </button>
          )}
          
        </header>
  )
}

export default Header
