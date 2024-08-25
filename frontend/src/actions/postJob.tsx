/* eslint-disable @typescript-eslint/no-explicit-any */
import { BACKEND_URL } from "@/constants";
import { postJobTypes } from "@/pages/NewJob/NewJob";
import { toast } from "sonner";

export const postJob = async(values:postJobTypes)=>{
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/newJob`,{
        method:"POST",
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
      });
      const data =  await res.json();
       if(!res.ok){
        throw new Error(data.error || 'Erroor')
       }
       toast.success("Job Postedd!")
    } catch (error:any) {
          console.log(error.message);
          toast.error(error.message)
    }
};