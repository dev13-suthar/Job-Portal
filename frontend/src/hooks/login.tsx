import { loginProps } from "@/components/LoginForm";
import { BACKEND_URL } from "@/constants";
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";



export const loginUser = async(values:loginProps,navigate:NavigateFunction)=>{
    const res = await fetch(`${BACKEND_URL}/api/v1/signin`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
    });
    const data = await res.json();
    localStorage.setItem("token",data.token);
    if(data.role==="Employee" && data.hasCreatedCompany==false){
         navigate("/home/setProfile")
    }else if(data.role=="User" && data.isProfileCompleted===false){
         navigate("/home/setProfile")
    }else{
         navigate("/home/feed")
    }
    toast.success("Logged in")
    return data.token;
}