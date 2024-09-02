/* eslint-disable @typescript-eslint/no-explicit-any */
import { BACKEND_URL } from "@/constants";
import { editProps } from "@/pages/EditJobs/EditJob";
import { toast } from "sonner";

export const getAllJobs = async()=>{
    const res = await fetch(`${BACKEND_URL}/api/v1/jobs/all`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      return data.jobs;
}

export const applyToJob = async(jobId:string)=>{
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/apply?jobId=${jobId}`,{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
    });
    const data = await res.json();
    if(!res.ok){
      const error = data.error;
      toast.error(error)
    }else{
      toast.success("Successfully Applied")
    }
  } catch (error:any) {
    toast.error(error.message)
  }
}

export const editJob = async(jobId:string,values:editProps)=>{
  try {
      const res = await fetch(`${BACKEND_URL}/api/v1/jobs/editJob/${jobId}`,{
        method:"PATCH",
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" 
        },
        body:JSON.stringify(values)
      });
      const data  = await res.json();
      if(!res.ok){
        const err = data.message || "Failed to update job";
            toast.error(err);
            return;
      }
      toast.success("Job Updated..")
  } catch (error:any) {
    console.log(error)
    toast.error(error.message)
  }
}