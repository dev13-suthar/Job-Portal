import CreateCompanyForm from "@/components/CreateCompanyForm";
import UserProfileForm from "@/components/UserProfileForm";
import { decodedUserRoleState } from "@/state/roleAtom"
import { useRecoilValue } from "recoil"


const Setprofile = () => {
    const userRole = useRecoilValue(decodedUserRoleState);
  return (
    userRole==="Employee"?(
        <CreateCompanyForm/>
    ):(
      <UserProfileForm/>
    )
  )
}

export default Setprofile