import JobDisplay from "@/components/JobDisplay"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spotlight } from "@/components/ui/Spotlight"
import { BACKEND_URL } from "@/constants"
import { AllJobsAtom } from "@/state/Alljobs"
import { joblocationAtom, jobRoleAtom } from "@/state/queryAtoms"
import { sortAtom } from "@/state/sortAtom"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

const UsersFeed = () => {
  const [joblocation,setJoblocation] = useRecoilState(joblocationAtom);
  const [role,setrole] = useRecoilState(jobRoleAtom);
  const setAllJobs = useSetRecoilState(AllJobsAtom);
  const sortatom = useRecoilValue(sortAtom)
  // TOdo shift this to Actions folders
  const FilterJobsBySearch = async(role:string,joblocation?:string,sortatommm?:string)=>{
      const res = await fetch(`${BACKEND_URL}/api/v1/jobs/multiJob?role=${role}&location=${joblocation}&sort=${sortatommm}`,{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      setAllJobs(data.jobs)
  }

  const handleSearch = async()=>{
      await FilterJobsBySearch(role,joblocation,sortatom);
  }
  useEffect(() => {
    FilterJobsBySearch(role, joblocation, sortatom);
  }, [sortatom]); //
  return (
    <div>
          <div className="h-[10rem]">
            <Spotlight className="left-30 -top-20"
            fill="purple  "/>
            <div className="px-16 pt-10 font-semibold text-4xl">
          Find Your <span className="text-blue-700 font-bold">new Job </span>Today
          <p className="text-gray-500 text-[15px]">Thousands of jobs in computer, engineering and technology sectors are  waiting for you</p>
          </div>
          </div>
          <div className="flex items-center w-full mt-4 px-16 pb-5">
              <Input
              placeholder="💼 What position are u looking for?"
              className="p-2 w-[60%]"
              value={role}
              onChange={(e)=>setrole(e.target.value)}
              />
              <Input
              placeholder="📍 Location"
              className="p-2 w-[30%]"
              value={joblocation}
              onChange={(e)=>setJoblocation(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
          </div><hr />
          <div className="px-10 flex justify-center">
              <JobDisplay/>
          </div>
    </div>
  )
}

export default UsersFeed