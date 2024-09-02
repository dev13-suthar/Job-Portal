import { Link, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { decodedUserRoleState } from '@/state/roleAtom';
import { useState } from 'react';

const Appbar = () => {
  const navigate = useNavigate();
  const userRole = useRecoilValue(decodedUserRoleState);
  const [showDialog, setshowDialog] = useState(false);
  return (
    <div className='p-3 bg-slate-900 flex items-center justify-between px-10'>
        <p onClick={()=>navigate("/home/feed")} className='cursor-pointer font-semibold'>JobSPot</p>
       <div className='flex items-center gap-4'>
        {userRole==="Employee" && <p className='cursor-pointer' onClick={()=>{
          navigate("/home/newJob")
        }}>Post Job</p>}
        <div className='relative'>
        <span className='cursor-pointer' onClick={()=>{setshowDialog(t=>!t)}}><UserIcon/></span>
        {showDialog && (
          <div className='w-[60] h-max px-3 py-1 absolute rounded-xl top-11 right-1 bg-red-300 flex flex-col gap-2 divide-y-2'>
          <Link  to={"/home/me"}  onClick={()=>setshowDialog(false)} className='font-bold'>Profile</Link>
          <Link to={"/home/myApplication"}  onClick={()=>setshowDialog(false)}  className='font-bold'>Applications</Link>
          <Link to={"/"} className='font-bold' onClick={()=>setshowDialog(false)} >Logout</Link>
      </div>
        )}
        </div>
       </div>
    </div>
  )}

export default Appbar

 const UserIcon = ()=>{
  return(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

  )
}