import EditModal from "@/components/EditModal";
import { BACKEND_URL } from "@/constants";
import { jobsResponse } from "@/hooks/useGetJobs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const EmployeeFeed = () => {
    const [jobs, setjobs] = useState<jobsResponse[]>();
    const [loading, setloading] = useState(true);
    const [showModal, setshowModal] = useState(false);
    useEffect(()=>{
      const getJobs = async()=>{
        const res = await fetch(`${BACKEND_URL}/api/v1/employee/getMyJobs`,{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        setjobs(data.jobs);
        setloading(false);
      }
      getJobs();
    },[])
    if(loading){
      return "vsvosloadinfb"
    }
  return (
    <div>
      <header className='p-5 pt-9'>
          <p className="text-blue-600 text-4xl font-semibold">Jobs you created:-</p>
      </header>
      <div className={`flex items-center justify-center p-5 ${showModal?'':null}`}>
          <div className="w-[70%] flex flex-col gap-3">
              {jobs?.map((job)=>(
                <MyjobsCard key={job._id} id={job._id} role={job.role} companyLocation={job.companyLocation??"India"} jobType={job.location} salaray={job?.salary??"null"} applications={job.submissions.length.toString()} showModal={showModal} setShowModal={setshowModal}/>
              ))}
          </div>
      </div>
    </div>
  )
}

export default EmployeeFeed

export const MyjobsCard = ({role,companyLocation,jobType,salaray,applications,id,showModal,setShowModal}:{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  role:string,companyLocation:string,jobType:string,salaray:string,applications:string,id:string,showModal?:boolean,setShowModal:(t:any)=>void
})=>{
  const router = useNavigate();
  return(
    <div className="p-3 grid grid-cols-4 w-full h-max bg-slate-900 rounded-xl">
        <div className="text-xl flex flex-col">
            <p className="font-bold">{role}r</p>
            <div className="flex items-center gap-3 text-gray-600 text-[13px] font-bold cursor-pointer" onClick={()=>{
        router(`/home/myJobinfo/${id}`)
    }}>
                <p>- {companyLocation}</p>
                <p>- {jobType}</p>
            </div>
        </div>
        <div className="flex justify-center items-center">
           {salaray}
        </div>
        <div className="flex items-center justify-center">
          <p className="text-gray-600">{applications} Applicants</p> 
        </div>
        <div className="flex items-center justify-end">
        <button className="bg-slate-500 p-2 px-4 rounded-xl" onClick={()=>{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setShowModal((t: any)=>!t)
        }}>Edit</button>
        </div>
        {showModal && <EditModal id={id}/>}
    </div>
  )
}