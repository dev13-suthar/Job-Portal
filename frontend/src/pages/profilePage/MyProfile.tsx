import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { BACKEND_URL } from "@/constants"
import { User } from "@/lib/types"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GIthubProfileCard from "./GIthubProfileCard"
import EditProfilePic from "./EditProfilePic"


const MyProfile = ({isMe}:{isMe:boolean}) => {
    const [user, setuser] = useState<User>();
    const [loading, setloading] = useState(true);
    const {id} = useParams();
    const gitHubUserName = user?.githubUserName;
    useEffect(()=>{
        const data = async()=>{
            const res = await fetch(`${BACKEND_URL}/api/v1/${isMe?`me`:`user/${id}`}`,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            setuser(data.user);
            setloading(false)
        }
        data();
    },[id,isMe]);
    if(loading){
        return "loadnvfsnvjfsvs"
    }
  return (
    <div>
        <header className="px-12 pt-10">
            {isMe && (<p className="text-3xl font-bold">My Profile</p>)}
        </header>
        <div className="flex items-center justify-center w-full mt-6">
            <div className="w-[60%] p-3 border-2 h-full flex flex-col">
                {/* Headerr */}
                <section className="flex  w-full h-max">
                    {isMe?(
                        <EditProfilePic user={user}/>
                    ):user?.profilePic?(
                        <Avatar className="size-36">
                            <AvatarImage src={user.profilePic}/>
                            <AvatarFallback>FK</AvatarFallback>
                        </Avatar>
                    ):(
                        <Avatar className="size-36">
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>FK</AvatarFallback>
                        </Avatar>
                    )}
                    {/* {user?.profilePic ? (
                        <EditProfilePic user={user}/>
                    ):(
                        <div className="w-[40%] h-[250px]  flex justify-center items-center">
                        <Avatar className="size-36">
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>FK</AvatarFallback>
                        </Avatar>
                    </div>
                    )} */}
                    <div className="w-[60%] h-[max]  p-2 flex flex-col gap-2">
                        {/* Name */}
                        <p className="text-2xl font-semibold text-blue-600">Basic Info</p><hr />
                        <div className="p-1">
                            <p className="text-xl font-bold">{user?.name}</p>
                            <p className="text-gray-500 text-[15px]">{user?.profile?.profileSummary}</p>
                            <p className="mt-6">Role : {user?.profession}</p>
                        </div>
                    </div>
                </section>
                <p className="text-2xl">Experience:</p>
                <div className="w-full mt-1  p-7 flex justify-center items-center">
                    <div className="w-full border p-3 h-max flex flex-col gap-3">
                        <div className="flex px-9 flex-col md:flex-row gap-5 md:gap-0">
                            <div className="w-[50%]">
                                <label htmlFor="" className="text-[12px] text-gray-500">CmpanyName:-</label>
                                <p>{user?.profile?.pastExperience[0].companyName}</p>
                            </div>
                            <div className="w-full md:w-[50%] justify-center items-center">
                                <div className="justify-between items-center flex">
                                    <section>
                                        <label htmlFor="" className="text-[12px] text-gray-500">Role:-</label>
                                        <p>{user?.profile?.pastExperience[0].role}</p>
                                    </section>
                                    <section>
                                    <label htmlFor="" className="text-[12px] text-gray-500">Start Date:-</label>
                                    <p>{user?.profile?.pastExperience[0].startDate}</p>
                                    </section>
                                    <section>
                                    <label htmlFor="" className="text-[12px] text-gray-500">End Date:-</label>
                                    <p>{user?.profile?.pastExperience[0].endDate}</p>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-2  px-12 flex items-center justify-between h-max border">
                        {!gitHubUserName?(
                            <div className="p-10 w-[210px] h-[100px] bg-slate-900 rounded-xl flex justify-center items-center">
                                No Github Data Found :(
                            </div>
                        ):(
                            <GIthubProfileCard username={gitHubUserName ?? ""}/>
                        )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyProfile    