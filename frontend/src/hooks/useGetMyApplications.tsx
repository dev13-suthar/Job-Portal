import { useEffect, useState } from "react"
import { jobsResponse } from "./useGetJobs"
import { BACKEND_URL } from "@/constants";

const useGetMyApplications = () => {
    const [jobs, setjobs] = useState<jobsResponse[]>();
    const [isLoading, setisLoading] = useState(true);

    useEffect(()=>{
        const getData = async()=>{
            const res = await fetch(`${BACKEND_URL}/api/v1/myapplications`,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            setjobs(data.jobs);
            setisLoading(false);
        }
        getData();
    },[])
  return (
    {isLoading,jobs}
  )
}

export default useGetMyApplications