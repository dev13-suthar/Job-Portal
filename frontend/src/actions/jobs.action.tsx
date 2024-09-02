import { BACKEND_URL } from "@/constants";
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