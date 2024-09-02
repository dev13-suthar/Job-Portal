import { useNavigate } from "react-router-dom"

const UserCard = ({name,role,id}:{
    name:string,
    role:string,
    id:string|number
}) => {
    const navigate = useNavigate();
  return (
    <div className='p-3 w-full flex justify-between px-5 items-center bg-slate-900 rounded-xl cursor-pointer' onClick={()=>{
        navigate(`/home/user/${id}`)
    }}>
        <div className="flex items-center gap-2">
           💼
           <p>{name}</p>
        </div>
        <p>{role}</p>
    </div>
  )
}

export default UserCard