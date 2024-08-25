import { decodedUserRoleState } from '@/state/roleAtom';
import { useRecoilValue } from 'recoil';
import UsersFeed from './UsersFeed';
import EmployeeFeed from './EmployeeFeed';

const Feed = () => {
  const userRole = useRecoilValue(decodedUserRoleState);
  return (
    userRole==="User"?(
      <UsersFeed/>
    ):(
      <EmployeeFeed/>
    )
  )
}

export default Feed