import React,{useState} from 'react'


const FilterForm = React.memo(({ onFilterSubmit }) => {
    const [filter,setFilter]=useState({
        company:"",
        position:"",
        experience:"",
        email:"",
        industry:"",
    })

    const handleSubmit=(e)=>{
        e.preventDefault();
        onFilterSubmit(filter);
        console.log(filter)
    }

  return (
    <div className='flex flex-col gap-2 p-2 border border-gray-300 rounded-lg shadow-md'>
      <form action="" onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <input className="border border-gray-300 rounded-md p-2" type="text" placeholder='Company' value={filter.company} onChange={(e)=>setFilter({...filter,company:e.target.value})}/>
        <input className="border border-gray-300 rounded-md p-2" type="text" placeholder='Position' value={filter.position} onChange={(e)=>setFilter({...filter,position:e.target.value})}/>
        <input className="border border-gray-300 rounded-md p-2" type="text" placeholder='Experience' value={filter.experience} onChange={(e)=>setFilter({...filter,experience:e.target.value})}/>
        <input className="border border-gray-300 rounded-md p-2" type="email" placeholder='Email' value={filter.email} onChange={(e)=>setFilter({...filter,email:e.target.value})}/>
        <input className="border border-gray-300 rounded-md p-2" type="text" placeholder='Industry' value={filter.industry} onChange={(e)=>setFilter({...filter,industry:e.target.value})}/>
        <button className="bg-[#8B5CF6] text-white p-2 rounded-md hover:bg-[#7C3AED]" type='submit'>Filter</button>
      </form>
    </div>
  )
})

export default FilterForm
