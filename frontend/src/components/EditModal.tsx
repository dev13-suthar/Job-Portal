import { BACKEND_URL } from "@/constants"
import { jobsResponse } from "@/hooks/useGetJobs"
import { useEffect, useState } from "react"

const EditModal = ({id}:{
    id?:string
}) => {
    const [job, setjob] = useState<jobsResponse>();
    const [loadingg, setloadingg] = useState(true)
    useEffect(()=>{
        const data = async()=>{
            const res = await fetch(`${BACKEND_URL}/api/v1/jobs/job/${id}`,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            setjob(data.job);
            setloadingg(false);
        }
        data();
    },[id])
    if(loadingg){
        return 
    }
  return (
    <div className="z-50 blur-0  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-[550px] h-[221px] border bg-slate-300 rounded-2xl">
        <div className="flex justify-center items-center">
            
        </div>
</div>

  )
}

export default EditModal