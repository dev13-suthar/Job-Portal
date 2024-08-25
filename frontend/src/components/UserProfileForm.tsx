import { Formik, FormikHelpers } from "formik"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { BACKEND_URL } from "@/constants";
import { useNavigate } from "react-router-dom";

type formProps = {
    profilesummary:string,
    pastExperience:{
      startDate:string,
      endDate:string,
      role:string,
      companyName:string
    },
    profession:string
};


const UserProfileForm = () => {
  const navigate = useNavigate();
  const createProfile = async(values:formProps)=>{
    const res = await fetch(`${BACKEND_URL}/api/v1/profileSummary`,{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify(values)
    });
     await res.json();
    if(!res.ok){
      alert("SOmething wrong")
    }else{
      navigate("/feed")
    }
    
  }
  
  const handleFomrSUbmit = async(values:formProps,helpers:FormikHelpers<formProps>)=>{
      await createProfile(values);
      helpers.resetForm();
  }
  return (
    <div className="p-4 py-12 flex justify-center items-center">
        <div className="flex flex-col p-4 gap-3 w-[80%] bg-slate-900 rounded-xl">
            <header className="font-semibold text-2xl flex flex-col gap-1">Let's Complete your profile
              <p className="text-xs text-gray-500">U know? good profiles attracts more JObs</p>
            </header>
            <div className="flex  items-center justify-center mt-7">
                <Formik
                initialValues={{
                  profilesummary:"",
                  profession:"",
                  pastExperience:{
                    startDate:"",
                    endDate:"",
                    role:"",
                    companyName:""
                  }
                }}
                onSubmit={handleFomrSUbmit}
                >
                  {({
                    values,
                    handleChange,
                    errors,
                    touched,
                    isSubmitting,
                    handleSubmit
                  })=>(
                    <form action="" className="flex w-[60%] items-center gap-3 flex-col" onSubmit={handleSubmit}>
                      <div className="flex flex-col justify-start items-start w-full">
                          <label>Profession</label>
                          <Input
                          placeholder="Web developer, HR, Devpos engineer, Marketing Head, Manager, Student"
                          name="profession"
                          value={values.profession}
                          onChange={handleChange}
                          />{errors.profession && touched.profession && errors.profession}
                      </div>
                      <Textarea
                      placeholder="Profile Summary"
                      value={values.profilesummary}
                      onChange={handleChange}
                      name="profilesummary"
                      rows={5}
                      />{errors.profilesummary && touched.profilesummary && errors.profilesummary}
                    <div className="flex flex-col items-start w-full justify-start gap-2 mt-3">
                        <p className="text-xl">Past Experience:</p>
                        <div className="flex items-center justify-between p-1 w-full flex-wrap gap-3">
                            <Input
                            placeholder="Company Name"
                            className="w-[266px]"
                            name="pastExperience.companyName"
                            id="write"
                            value={values.pastExperience.companyName}
                            onChange={handleChange}
                            />{errors.pastExperience?.companyName && touched.pastExperience?.companyName && errors.pastExperience.companyName}
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-xs">Start Date</p>
                                <input 
                                type="date" className="bg-slate-900 p-1 text-white border" 
                                value={values.pastExperience.startDate} 
                                onChange={handleChange}
                                name="pastExperience.startDate"
                                />{errors.pastExperience?.startDate && touched.pastExperience?.startDate && errors.pastExperience.startDate}
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-xs">End Date</p>
                                <input type="date" className="bg-slate-900 p-1 text-white border" color="white"
                                value={values.pastExperience.endDate}
                                onChange={handleChange}
                                name="pastExperience.endDate"
                                />{errors.pastExperience?.endDate && touched.pastExperience?.endDate && errors.pastExperience?.endDate}
                            </div>
                        </div>
                        <Input 
                        placeholder="Role in Last company"
                        value={values.pastExperience.role}
                        onChange={handleChange}
                        name="pastExperience.role"
                        />{errors.pastExperience?.role && touched.pastExperience?.role && errors.pastExperience?.role}
                    </div>
                    <Button className="mt-10 rounded-xl p-4 w-[156px]">{isSubmitting?"Creating..":"Create"}</Button>
                </form>
                  )}
                </Formik>
            </div>
            <div className="mt-4 flex items-center justify-end">
                <Button className="rounded-xl bg-gray-800 text-white hover:text-stone-800" onClick={()=>{
                  navigate("/home/feed")
                }}>Skip for Now</Button>
            </div>
        </div>
    </div>
  )
}

export default UserProfileForm