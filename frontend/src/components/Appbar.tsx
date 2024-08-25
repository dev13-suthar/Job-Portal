import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useRecoilValue } from 'recoil';
import { decodedUserRoleState } from '@/state/roleAtom';

const Appbar = () => {
  const navigate = useNavigate();
  const userRole = useRecoilValue(decodedUserRoleState);
  return (
    <div className='p-3 bg-slate-900 flex items-center justify-between'>
        <p onClick={()=>navigate("/home/feed")} className='cursor-pointer font-semibold'>JobSPot</p>
       <div className='flex items-center gap-4'>
        {userRole==="Employee" && <p className='cursor-pointer' onClick={()=>{
          navigate("/home/newJob")
        }}>Post Job</p>}
       <Button className='rounded-xl' onClick={()=>{
          navigate("/signin");
          localStorage.removeItem("token")
        }}>Logout</Button>
       </div>
    </div>
  )










  
}

export default Appbar