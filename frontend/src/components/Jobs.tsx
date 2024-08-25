import useGetJobs from '@/hooks/useGetJobs'
import { Button } from './ui/button';
import JobCardSkeleton from './ui/JobCardSkeleton';
import { useRecoilValue } from 'recoil';
import { joblocationAtom, jobRoleAtom } from '@/state/queryAtoms';


const Jobs = () => {
  const joblocation = useRecoilValue(joblocationAtom);
  const role = useRecoilValue(jobRoleAtom);
  const {allJobs,isLoading} = useGetJobs(role,joblocation);
  return (
    <div className='p-2 w-[70%] border'>
        <div className='flex justify-between items-center pb-2 px-6'>
            <p className='text-3xl'>{allJobs?.length} Jobs</p>
            <Button className='rounded-[22px]'>Sort by</Button>
        </div><hr />
        <div className='flex flex-col px-14 gap-3 mt-8'>
              {isLoading ? (<>
                {[1,2,3,4].map((i)=>(
                  <JobCardSkeleton key={i}/>
                ))}
              </>):
              (<>
                {allJobs?.map((job)=>(
                <JobCard key={job._id} company={job.company} companyLocation={job.companyLocation??"India"} role={job.role} desc={job.description} salary={job.salary ?? ""}location={job.location}/>
              ))}
              </>)}
        </div>
    </div>
  )
}

export default Jobs

const JobCard = ({company,location,role,salary,desc,companyLocation}:{
  company:string
  location:string,
  role:string,
  salary:string,
  desc:string,
  companyLocation:string
})=>{
  return(
    <>
      <div className='w-full bg-slate-900 rounded-[13px] p-2  flex gap-2 py-7'>
                  <div className='w-[25%] flex justify-center items-start'>
                        <div className='w-24 h-16 rounded-xl bg-slate-800 flex justify-center items-center'>
                                  FUCK
                        </div>  
                  </div>
                  <div className='flex flex-col w-[75%] p-1 gap-1'>
                      <p className='text-gray-500'>{company}</p>
                      <p className='text-xl font-light'>{role}</p>
                      <div className='flex items-center gap-4'>
                        <span  className='text-gray-600 text-[14px]'> • {companyLocation}</span>
                        <span  className='text-gray-600 text-[14px]'> • {location}</span>
                        <span  className='text-gray-600 text-[14px]'> • {salary || "140lpa"}</span>
                        {/* <span  className='text-gray-600 text-[14px]'> - Remote</span> */}
                      </div>
                      <div>
                        <p>{desc.slice(0,100)}...</p>
                      </div>
                  </div>
         </div>
    </>
  )
}

