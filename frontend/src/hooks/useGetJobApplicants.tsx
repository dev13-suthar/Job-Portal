import { BACKEND_URL } from '@/constants';
import { User } from '@/lib/types'
import { useEffect, useState } from 'react'

const useGetJobApplicants = (jobId:string) => {
    const [applicants, setapplicants] = useState<User[]>();
    const [loadingApplicants, setloadingApplicants] = useState(true);
    useEffect(()=>{
        const getData = async()=>{
            const res = await fetch(`${BACKEND_URL}/api/v1/jobs/getApplicants/${jobId}`,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            setapplicants(data.applicants);
            setloadingApplicants(false)
        }
        getData();
    },[jobId])
  return (
        {applicants,loadingApplicants}
  )
}

export default useGetJobApplicants