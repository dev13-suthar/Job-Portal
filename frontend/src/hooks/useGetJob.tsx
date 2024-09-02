import { useEffect, useState } from "react";
import { jobsResponse } from "./useGetJobs";
import { BACKEND_URL } from "@/constants";


const useGetJob = (id:string) => {
    const [jobs, setjobs] = useState<jobsResponse>();
    const [loading, setloading] = useState(true);
    useEffect(()=>{
        const getjob = async()=>{
            const res = await fetch(`${BACKEND_URL}/api/v1/jobs/job/${id}`,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            setjobs(data.job);
            setloading(false);
        }
        getjob();
    },[id]);

  return (
    {loading,jobs}
  )
}

export default useGetJob