/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadProfilePic } from '@/actions/UploadProfilePic';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/types';
import { useRef, useState } from 'react'

const EditProfilePic = ({user}:{user?:User}) => {
    const [image, setimage] = useState<any>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleCLick = async()=>{
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","company");
        data.append("cloud_name","dzshzxqu4");
        const response = await fetch(`https://api.cloudinary.com/v1_1/dzshzxqu4/image/upload`,{
            method:"POST",
            body:data
        });
        const resData = await response.json();
        await UploadProfilePic(resData.secure_url);
    }
  return (
    <>
     {user?.profilePic?(
        <div className='rounded-full w-[40%] flex items-center justify-center'>
            <img src={user?.profilePic} className='size-36 rounded-full'/>
        </div>
     ):(
        <div className='w-[40%] h-max flex flex-col items-center justify-center mb-5'>
        <p className='font-bold mb-2'>Profile Pic</p>
        <div className="p-4 h-40 w-40 bg-slate-900 rounded-xl flex justify-center items-center cursor-pointer" onClick={()=>{fileInputRef?.current?.click()}}>
        <input hidden type="file" className="w-full h-full" ref={fileInputRef} onChange={(e)=>{
            if(e.target.files && e.target.files.length>0){
                setimage(e.target.files[0])
            }
        }}/>
        <p className="text-3xl font-bold text-white">+</p>
    </div>
       <Button className='mt-4' onClick={handleCLick}>Upload</Button>
    </div>
     )}
    </>
  )
}

export default EditProfilePic