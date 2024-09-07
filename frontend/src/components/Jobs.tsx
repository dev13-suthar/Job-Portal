import { jobsResponse } from '@/hooks/useGetJobs'
import JobCardSkeleton from './ui/JobCardSkeleton';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { AllJobsAtom } from '@/state/Alljobs';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from './ui/avatar';
import { sortAtom } from '@/state/sortAtom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';


const Jobs = () => {
  // const {allJobs,isLoading} = useGetJobs(role,joblocation);
  const allJobs = useRecoilValueLoadable(AllJobsAtom);
  const setSortatom = useSetRecoilState(sortAtom);
  
  return (
    <div className='p-2 w-[70%] border'>
        <div className='flex justify-between items-center pb-2 px-6'>
            <p className='text-3xl'>{allJobs.contents.length} Jobs</p>
           <div className='flex items-center gap-2'>
            <Select onValueChange={(val)=>setSortatom(val)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest JOb</SelectItem>
                  <SelectItem value="asc">Oldest JOb</SelectItem>
                </SelectContent>
          </Select>
           </div>
        </div><hr />
        <div className='flex flex-col px-14 gap-3 mt-8'>
             {allJobs.state=="loading"?(
                [1,2,3,4,5].map((i)=>(
                  <JobCardSkeleton key={i}/>
                ))
             ):(
              <>
              {allJobs.contents.map((job:jobsResponse)=>(
              <JobCard _id={job._id} key={job._id} company={job.company} companyLocation={job.companyLocation??"India"} role={job.role} desc={job.description} salary={job.salary ?? ""} location={job.location}/>
            ))}
            </>
             )}
        </div>
    </div>
  )
}

export default Jobs

const JobCard = ({company,location,role,salary,desc,companyLocation,_id}:{
  company:string
  location:string,
  role:string,
  salary:string,
  desc:string,
  companyLocation:string,
  _id:string
})=>{
  const navigate = useNavigate();
  const companyFullName = company.split(" ");
  const CompanyAvatar = `${companyFullName[0]?.charAt(0)} ${companyFullName[1]?.charAt(0)}`;
  return(
    <>
      <div className='w-full bg-slate-900 rounded-[13px] p-2  flex gap-2 py-7 cursor-pointer' onClick={()=>{
          navigate(`/home/job/${_id}`)
      }}>
                  <div className='w-[25%] flex justify-center items-start'>
                        <Avatar className='size-28'>
                            <AvatarFallback>{CompanyAvatar}</AvatarFallback>
                        </Avatar>  
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

