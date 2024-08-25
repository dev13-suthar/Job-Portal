import CreateCompanyForm from "@/components/CreateCompanyForm";
import UserProfileForm from "@/components/UserProfileForm";
import { decodedUserRoleState } from "@/state/roleAtom"
import { useRecoilValue } from "recoil"


const Setprofile = () => {
    const userRole = useRecoilValue(decodedUserRoleState);
    console.log(userRole);

  return (
    userRole==="Employee"?(
        <CreateCompanyForm/>
    ):(
      <UserProfileForm/>
    )
  )
}

export default Setprofile