import React from 'react'

const FiltersSideBar = () => {
  return (
    <div className='p-3 w-[30%] border bg-slate-900 py-8 sticky top-2 h-max'>
        <p className='font-bold tracking-wide text-2xl'>Filters</p>
        <div className='p-1 flex flex-col gap-2 pl-8 mt-5'>
            <Filter title='Location'>
              <div className='pl-8 mt-4 flex flex-col gap-2'>
                 <span> <input type="checkbox" name="Remote" id="" value="Remote"/> Remote</span>
                  <span><input type="checkbox" name="hybrid" id="" value="Remote"/> Hybrid</span>
                  <span> <input type="checkbox" name="on-site" id="" value="Remote"/> On-Site</span>
              </div>
            </Filter>
            <Filter title='Salaray'>
                <div className='pl-8 mt-4 flex flex-col gap-2'>
                <span> <input type="radio" name="Remote" id="" value="Remote"/>Any</span>
                  <span><input type="radio" name="hybrid" id="" value="Remote"/> &gt;140$ </span>
                  <span> <input type="radio" name="on-site" id="" value="Remote"/>&gt;200$</span>
                  <span> <input type="radio" name="on-site" id="" value="Remote"/>&gt;250$</span>
                </div>
            </Filter>
        </div>
    </div>
  )
}

export default FiltersSideBar

function Filter({title,children}:{
  title:string,
  children:React.ReactNode
}){
  return(
    <div className='flex flex-col pb-4'>
        <p className='text-blue-500 font-semibold text-2xl'>{title}</p>
        {children}
    </div>
  )
}