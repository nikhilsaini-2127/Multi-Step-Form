import React from 'react'

const Card = ({title,data}) => {
  return (
    <div className='flex flex-col border border-[#DDD6FE] rounded-xl px-4 p-2 w-[23%]'>
      <span className='text-[.7rem]'>
        {title}
      </span>
      <span className='text-4xl text-[#8B5CF6] '>
        {data}
      </span>
    </div>
  )
}

export default Card
