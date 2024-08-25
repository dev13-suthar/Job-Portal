import { loginProps } from '@/components/LoginForm';
import { BACKEND_URL } from '@/constants';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useLogin = (values:loginProps) => {
    const navigate = useNavigate();
    const [token, settoken] = useState("")
    useEffect(()=>{
        const doLogin = async()=>{
            const res = await fetch(`${BACKEND_URL}/api/v1/signin`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(values)
            });
            const data = await res.json();
            localStorage.setItem("token",data.token);
            settoken(data.token);
            if(data.role==="Employee" && data.hasCreatedCompany==false){
                navigate("/setProfile")
            }else if(data.role=="User" && data.isProfileCompleted===false){
                navigate("/setProfile")
            }else{
                navigate("/feed")
            }
        }
        doLogin();
    },[values])
  return (
        {token}
  )
}

export default useLogin