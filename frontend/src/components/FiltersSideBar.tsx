import React, { useState } from 'react'
import { Button } from './ui/button'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AllJobsAtom } from '@/state/Alljobs';
import { BACKEND_URL } from '@/constants';
import { getAllJobs } from '@/actions/jobs.action';
import { sortAtom } from '@/state/sortAtom';

const FiltersSideBar = () => {
  const [locationType, setlocationType] = useState("");
  const [salary, setsalary] = useState<number>();
  const [isFilterApplied, setisFilterApplied] = useState(false);
  const sortatom = useRecoilValue(sortAtom);
  const setAllJobs = useSetRecoilState(AllJobsAtom)
  const handleClick = async()=>{
      const res = await fetch(`${BACKEND_URL}/api/v1/jobs/multiJob?locationType=${locationType}&sort=${sortatom}&salary=${salary}`,{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      console.log(salary);
      setAllJobs(data.jobs);
  }
  return (
    <div className='p-3 w-[30%] border bg-slate-900 py-8 sticky top-2 h-max'>
        <p className='font-bold tracking-wide text-2xl'>Filters</p>
        <div className='p-1 flex flex-col gap-2 pl-8 mt-5'>
            <Filter title='Location'>
              <div className='pl-8 mt-4 flex flex-col gap-2'>
                 <span> <input type="checkbox" name="locationType" id="one" value="Remote" onChange={(e)=>setlocationType(e.target.value)}/> Remote</span>
                  <span><input type="checkbox" name="locationType" id="one" value="On-site" onChange={(e)=>setlocationType(e.target.value)}/> On-Site</span>
                  <span> <input type="checkbox" name="locationType" id="one" value="Hybrid" onChange={(e)=>setlocationType(e.target.value)}/> Hybrid</span>
              </div>
            </Filter>
            <Filter title='Salary'>
                <div className='pl-8 mt-4 flex flex-col gap-2'>
                <span> <input type="radio" name="salary" id="" value="0" onChange={(e)=>setsalary(Number(e.target.value))}/>Any</span>
                  <span><input type="radio" name="salary" id="salary" value="20"  onChange={(e)=>setsalary(Number(e.target.value))}/> &gt;20$ </span>
                  <span> <input type="radio" name="salary" id="salary" value="40" onChange={(e)=>setsalary(Number(e.target.value))}/>&gt;40$</span>
                  <span> <input type="radio" name="salary" id="salary" value="50" onChange={(e)=>setsalary(Number(e.target.value))}/>&gt;50$</span>
                </div>
            </Filter>
        </div>
            <Button className='rounded-xl w-full mt-2' onClick={()=>{
              setisFilterApplied(true)
              handleClick();
            }}>Apply FIlter</Button>
            {isFilterApplied &&(
              <Button className='rounded-xl w-full mt-2' onClick={async()=>{
                const jobs = await getAllJobs();
                setAllJobs(jobs);
                setisFilterApplied(false);
              }}>Reset Filters</Button>
            )}
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