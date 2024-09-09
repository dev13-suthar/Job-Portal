import React from 'react'

const SocialCard = ({title,children}:{
    title:string,
    children:React.ReactNode,
}) => {
  return (
    <div className='bg-slate-800 rounded-xl border pt-6 px-6 pb-3 w-[350px]'>
        <p className='text-2xl font-bold mb-5'>{title}</p>
        {children}
    </div>
  )
}

export default SocialCard