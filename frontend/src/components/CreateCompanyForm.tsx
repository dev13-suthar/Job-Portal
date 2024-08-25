import { Formik, FormikHelpers } from "formik"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "@/constants"

type companyProps = {
  name:string,
  description:string
}


const CreateCompanyForm = () => {
  const navigate = useNavigate();
  const createCompany = async(values:companyProps)=>{
      const res = await fetch(`${BACKEND_URL}/api/v1/createCompany`,{
        method:"POST",
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`,
          "Content-Type":"application/json",
        },
        body:JSON.stringify(values)
      });
      const data = await res.json();
      console.log(data) 
  }

  const handleFormSubmit = async(values:companyProps,helpers:FormikHelpers<companyProps>)=>{
    await createCompany(values);
    helpers.resetForm();
  }
  return (
    <div className='p-5 py-10 flex justify-center'>
        <div className='p-6 rounded-3xl border-slate-2000 bg-slate-900 w-[70%] h-full'>
            <header className='text-2xl font-semibold'>Create Company </header>
            <div className="mt-10 flex justify-center items-center flex-col gap-3">
               <Formik initialValues={{
                 name:"",
                 description:""
               }}
               onSubmit={handleFormSubmit}
               >
                 {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    isSubmitting
                 })=>(
                  <form action="" className="flex flex-col w-[60%] gap-3 items-center" onSubmit={handleSubmit}>
                    <Input placeholder="Enter Company Name"
                    value={values.name}
                    onChange={handleChange}
                    className="rounded-xl w-full  p-5"
                    name="name"
                    />{errors.name && touched.name && errors.name}
                    <Textarea
                    placeholder="Company Description"
                    className="w-full"
                    value={values.description}
                    rows={10}
                    name="description"
                    onChange={handleChange}
                    />
                    <Button className="w-full rounded-xl">{isSubmitting?"Creatingggg..":"Proceed"}</Button>
                  </form>
                 )}
               </Formik>
            </div>
        </div>
    </div>
  )
}

export default CreateCompanyForm