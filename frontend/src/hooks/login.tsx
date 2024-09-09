import { loginProps } from "@/components/LoginForm";
import { BACKEND_URL } from "@/constants";
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";



export const loginUser = async(values:loginProps,navigate:NavigateFunction)=>{
   try {
    const res = await fetch(`${BACKEND_URL}/api/v1/signin`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
    });
    const data = await res.json();
    localStorage.setItem("token",data.token);
    if(!res.ok){
        const err = data.msg;
        toast.error(err??"Error signin");
    }
    else{
        if(data.role==="Employee" && data.hasCreatedCompany==false){
            toast.success("Logged in")
            navigate("/home/setProfile")
       }else if(data.role=="User" && data.isProfileCompleted===false){
            toast.success("Logged in")
            navigate("/home/setProfile")
       }else{
            toast.success("Logged in")
            navigate("/home/feed")
       }
    }
    return data.token;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (error:any) {
        toast.error(error.message)
   }
}