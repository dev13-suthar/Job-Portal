import { applyToJob } from "@/actions/jobs.action";
import SingleJobSkeleton from "@/components/SingleJobSkeleton";
import { Button } from "@/components/ui/button";
import { singleJobAtom } from "@/state/SingleJob";
import { useParams } from "react-router-dom"
import { useRecoilValueLoadable } from "recoil";

const SingleJob = () => {
    const {id} = useParams();
    const job = useRecoilValueLoadable(singleJobAtom(id ?? ""));
    if(job.state==="loading"){
        return(
            <div className="px-8 py-10 flex justify-center items-center h-full w-full">
                <SingleJobSkeleton/>
            </div>
        )
    }
    const handleClick = async()=>{
        await applyToJob(id ?? "")
    }
  return (
    <div className="px-8 py-10 flex justify-center items-center h-full w-full">
        <div className="p-2 bg-slate-900 rounded-xl h-full  w-[60%] px-4">
            <header className="flex items-start gap-1 flex-col justify-star pb-6">
                <div className="flex items-center gap-3">
                <div className="bg-red-300 size-10 rounded-full"/>
                <p className="font-semibold">{job.contents.company}</p>
                </div>
                {/* Title */}
                <div className="text-2xl font-semibold mt-2">{job.contents.title}</div>
                <div className="text-gray-500 text-[14px] mt-1 flex items-center gap-4">
                    <p>• {job.contents.companyLocation || "India"}</p>
                    <p>• 15 days Ago</p>
                    <p>• {job.contents.submissions.length} applicants</p>
                </div>
                <div className="flex justify-start mt-5">
                <Button className="bg-purple-400 rounded-xl" onClick={handleClick}>Apply🎯</Button>
            </div>
            </header><hr />
            <div className="mt-2 flex flex-col p-1">
                <p className="text-2xl font-semibold">About the Role:</p>
                <p className="text-gray-500 font-medium text-[16px]">Role: <span>{job.contents.role}</span></p>
                <p className="text-gray-500 font-medium text-[16px]">location: <span>{job.contents.location}</span></p>
                <p className="text-gray-500 font-medium text-[16px]">salary:    <span>{job.contents.salary}</span></p>
            </div>
            <div className="mt-4 p-1 flex flex-col">
                <p className="text-2xl font-semibold">About the Job:</p>
                <div className="mt-2 text-gray-400">
                    <p>{job.contents.description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleJob