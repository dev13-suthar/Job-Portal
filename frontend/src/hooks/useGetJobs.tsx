import { BACKEND_URL } from '@/constants';
import { useEffect, useState } from 'react'

export type jobsResponse = {
    _id: string,
    title: string,
    description: string,
    company:string,
    createdBy:string,
    role:string,
    location: string,
    submissions: [],
    __v: string | number,
    salary?:string,
    companyLocation?:string
}

const useGetJobs = (role:string,joblocation:string) => {
    const [allJobs, setallJobs] = useState<jobsResponse[]>();
    const [isLoading, setisLoading] = useState(true);
    let backendCall = `${BACKEND_URL}/api/v1/jobs/all`;
    if(role.length>0 && joblocation.length>0){
        backendCall = `${BACKEND_URL}/api/v1/jobs/filteredJob?role=${role}&joblocation=${joblocation}`
    }else if(joblocation.length<0 && role.length>0){
        backendCall = `${BACKEND_URL}/api/v1/jobs/filteredJob?role=${role}`
    }else if(joblocation.length>0 && role.length<0){
        backendCall = `${BACKEND_URL}/api/v1/jobs/filteredJob?joblocation=${joblocation}`
    }else if(joblocation.length<0 && role.length<0){
        backendCall = `${BACKEND_URL}/api/v1/jobs/all`
    }
    useEffect(()=>{
        const getJobs = async()=>{
            await new Promise(resolve=>setTimeout(resolve,2000))
            const res = await fetch(backendCall,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                },
                  
            });
            const data = await res.json();
            setallJobs(data.jobs)
            setisLoading(false);
        }
        getJobs();
    },[])
  return {allJobs,isLoading}
}

export default useGetJobs