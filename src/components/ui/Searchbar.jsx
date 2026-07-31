import React from 'react'
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className='flex gap-1 border border-[#ddd6fe] px-2  rounded-xl justify-between items-center'>
      <input type="text" placeholder='search' className='p-1' />
      <span>
        <FaSearch/>
      </span>
    </div>
  )
}

export default Searchbar
