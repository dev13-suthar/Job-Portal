import { postJob } from "@/actions/postJob";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useGetCompany from "@/hooks/useGetCompany";
import { Formik, FormikHelpers } from "formik";


export type postJobTypes = {
  companyName:string,
  role:string,
  location:string,
  title:string,
  description:string,
  salary:string,
  companyLocation:string
}


const NewJob = () => {
    const {company} = useGetCompany()

    // Form SUbmission
    const handleFormsubmit = async(values:postJobTypes,helper:FormikHelpers<postJobTypes>)=>{
      await postJob(values); //Action for Job Posting
      helper.resetForm();
    }
  return (
    <div className='pt-12 px-4 flex justify-center items-center w-full'>
        <div className='p-3 flex flex-col gap-3 w-[78%] bg-slate-900 rounded-[8px]'>
            <header>
                <p className='text-3xl font-semibold'>Post new  Job!!</p>
            </header>
            <div className='mt-8 flex justify-center items-center'>
               <Formik
               initialValues={{
                companyName:"",
                salary:"",
                role:"",
                location:"",
                title:"",
                description:"",
                companyLocation:""
               }}
               onSubmit={handleFormsubmit}
               >
                {({
                    values,
                    handleSubmit,
                    handleChange,
                    touched,
                    errors,
                    isSubmitting
                })=>(
                  <form action="" className='w-[80%] flex flex-col justify-center items-center gap-5' onSubmit={handleSubmit}>
                  <select 
                  id="com[any"
                  value={values.companyName} 
                  className="w-full p-2 bg-slate-900 border" 
                  name="companyName" 
                  required
                  onChange={handleChange}>
                      <option value={""}  disabled>Select Company</option>
                       {company?.map((opt)=>(
                          <option key={opt._id} value={opt.name}>{opt.name}</option>
                        ))}
                  </select>
                  <Input
                  placeholder="Job Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  />{errors.title && touched.title &&  errors.title}
                  <Textarea
                  placeholder="Job Description"
                  name="description"
                  rows={6}
                  value={values.description}
                  onChange={handleChange}
                  />{errors.description && touched.description && errors.description}
                  <Input
                  placeholder="Role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  />{errors.role && touched.role && errors.role}
                  <Input
                  placeholder="Salary in LPA, 2lpa?"
                  name="salary"
                  value={values.salary}
                  onChange={handleChange}
                  />{errors.salary && touched.salary && errors.salary}
                  <Input
                  placeholder="Where's comapny located ?India,Usa,Delhi,SA etc"
                  name="companyLocation"
                  value={values.companyLocation}
                  onChange={handleChange}
                  />{errors.companyLocation && touched.companyLocation && errors.companyLocation}
                  <select
                  value={values.location}
                  name="location"
                  id="location"
                  required
                  className="w-full p-2 bg-slate-900 border"
                  onChange={handleChange}
                  >
                    <option value={""} disabled>Job Location Type</option>
                    <option value={"On-site"}>On-Site</option>
                    <option value={"Hybrid"}>Hybrid</option>
                    <option value={"Remote"}>Remote</option>
                  </select>
                  <Button className="w-full rounded-xl mt-3 bg-gray-600 text-white hover:text-stone-800">{isSubmitting?"Posting..":"Post"}</Button>
            </form> 
                )}
               </Formik>
            </div>
        </div>
    </div>
  )
}

export default NewJob

// https://chatgpt.com/share/32c05b7c-5d3f-4555-8c69-391cf8972cd8