/* eslint-disable @typescript-eslint/no-explicit-any */
import { companyLogo } from "@/state/ProfilePicAtom";
import { useRef, useState } from "react"
import { useRecoilState } from "recoil";
import { toast } from "sonner";

const UploadLogo = () => {
    const [image, setimage] = useState<any>();
    const [companyLogoURL, setcompanyLogoURL] = useRecoilState(companyLogo)
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleCLick  = ()=>{
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","company");
        data.append("cloud_name","dzshzxqu4");
        fetch("https://api.cloudinary.com/v1_1/dzshzxqu4/image/upload",{
            method:"POST",
            body:data
        })
        .then(resp=>resp.json())
        .then(data=>setcompanyLogoURL(data.secure_url))
        .catch(() => toast.error("Upload failed"));
        toast.success("Uploaded");
    }

  return (
    <div className="flex items-center justify-center p-10 flex-col" >
        <span className="mb-3">Logo Company</span>
       {companyLogoURL?(
            <div className="border-2 rounded-full h-36 w-36">
                <img src={companyLogoURL} className="w-full h-full rounded-full"/>
            </div>
       ):(
        <div className="p-4 h-40 w-40 bg-slate-900 rounded-xl flex justify-center items-center cursor-pointer" onClick={()=>{fileInputRef?.current?.click()}}>
        <input hidden type="file" className="w-full h-full" ref={fileInputRef} onChange={(e)=>{
            if(e.target.files && e.target.files.length>0){
                setimage(e.target.files[0])
            }
        }}/>
        <p className="text-3xl font-bold text-white">+</p>
    </div>
       )}
        <button className="p-3 mt-2 bg-slate-500" onClick={handleCLick}>upload</button>
    </div>
  )
}

export default UploadLogo