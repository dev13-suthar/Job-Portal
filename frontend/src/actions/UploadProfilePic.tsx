import { BACKEND_URL } from '@/constants'
import { toast } from 'sonner'

export const UploadProfilePic = async(url:string) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/v1/add/profilePic`,{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify({url})
        });
        const data = await res.json();
        if(!res.ok){
            const message = data.error;
            toast.error(message)
        }else{
            toast.success("Profile Pic Added")
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        toast.error(error.message)
    }
}

