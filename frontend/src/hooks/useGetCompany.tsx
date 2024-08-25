import { BACKEND_URL } from '@/constants';
import { useEffect, useState } from 'react'

interface companyType{
    _id: string,
    name:string,
    description: string,
    profilePic?:string,
    employee: string,
    jobs: [string],
    __v: string | number
}

const useGetCompany = () => {
    const [company, setcompany] = useState<companyType[]>();
    useEffect(()=>{
        const getCOmp = async()=>{
          const res = await fetch(`${BACKEND_URL}/api/v1/employee/getMyCompany`,{
            method:"GET",
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
          });
          const data = await res.json();
          setcompany(data.company)
        }
        getCOmp();
      },[]);

  return {company}
}

export default useGetCompany