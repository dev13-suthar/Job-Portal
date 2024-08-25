import JobDisplay from "@/components/JobDisplay"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spotlight } from "@/components/ui/Spotlight"
import { joblocationAtom, jobRoleAtom } from "@/state/queryAtoms"
import { useRecoilState } from "recoil"

const UsersFeed = () => {
  const [joblocation,setJoblocation] = useRecoilState(joblocationAtom);
  const [role,setrole] = useRecoilState(jobRoleAtom);
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
              value={joblocation}
              onChange={(e)=>setJoblocation(e.target.value)}
              />
              <Input
              placeholder="📍 Location"
              className="p-2 w-[30%]"
              value={role}
              onChange={(e)=>setrole(e.target.value)}
              />
              <Button>Search</Button>
          </div><hr />
          <div className="px-10 flex justify-center">
              <JobDisplay/>
          </div>
    </div>
  )
}

export default UsersFeed