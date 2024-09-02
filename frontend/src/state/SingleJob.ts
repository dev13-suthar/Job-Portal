import { BACKEND_URL } from "@/constants";
import { jobsResponse } from "@/hooks/useGetJobs";
import { atomFamily, selectorFamily } from "recoil";

const jobSelector = selectorFamily<jobsResponse|undefined,string>({
    key:"SIgnleJobSelector",
    get:(id:string)=>async()=>{
        await new Promise(resolve=>setTimeout(resolve,2000))
        const res = await fetch(`${BACKEND_URL}/api/v1/jobs/job/${id}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }); 
        const data = await res.json();
        return data.job
    }
})

export const singleJobAtom = atomFamily<jobsResponse|undefined,string>({
    key:"SIngleJob",
    default:jobSelector
});

