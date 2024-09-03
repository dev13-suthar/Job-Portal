import { editJob } from '@/actions/jobs.action';
import { BACKEND_URL } from '@/constants';
import { jobsResponse } from '@/hooks/useGetJobs';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
 
export type editProps = {
    title:string,
    description:string,
    salary:string
}

const EditJob = () => {
    const {id} = useParams();
    const [job, setjob] = useState<jobsResponse>();
    const [loadingg, setloadingg] = useState(true)
    useEffect(()=>{
        const data = async()=>{
            const res = await fetch(`${BACKEND_URL}/api/v1/jobs/job/${id}`,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            setjob(data.job);
            setloadingg(false);
        }
        data();
    },[id]);

    const handleFormSubmit = async(values:editProps)=>{
        await editJob(id??"",values);
    }

    if(loadingg){
        return "loaddinngngg.."
    }
  return (
    <div  className='px-10 pt-8 '>
        <p className='font-semibold text-4xl text-blue-500'>Edit Job</p>
        <div className='flex items-center justify-center p-3 flex-col'>
            <div className='w-[70%] flex justify-center items-center bg-slate-900 rounded-xl border p-4 flex-col'>
                <Formik
                onSubmit={handleFormSubmit}
                initialValues={{
                    title:job?.title ?? "",
                    salary:job?.salary ?? "",
                    description:job?.description ?? "",
                    // role:job?.role
                }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors,
                    })=>(
                        <form className='w-[70%] flex flex-col gap-2' onSubmit={handleSubmit}>
                            <section className='w-full grid grid-cols-3'>
                                <label htmlFor="" className='font-bold flex items-center justify-center'>Title:</label>
                                <input
                                name='title'
                                value={values.title}
                                placeholder={values.title}
                                onChange={handleChange}
                                className='w-full text-white col-span-2 bg-slate-700 p-3 rounded-xl'
                                />{errors.title && touched.title && errors.title}
                            </section>
                            <section className='w-full grid grid-cols-3'>
                                <label htmlFor="" className='font-bold flex items-center justify-center'>Salary:</label>
                                <input
                                name='salary'
                                value={values.salary}
                                placeholder={values.salary}
                                onChange={handleChange}
                                className='w-full col-span-2 text-white p-3 rounded-xl bg-slate-700'
                                />{errors.salary && touched.salary && errors.salary}
                            </section>
                            <section className='w-full grid grid-cols-3'>
                                <CustomLabel>Description:</CustomLabel>
                                <textarea value={values.description} placeholder={values.description} onChange={handleChange} name='description' className='w-full col-span-2 p-3 rounded-xl bg-slate-700' rows={10}
                                />{errors.description && touched.description && errors.description}
                            </section>
                            <button className='w-full rounded-xl mt-4 bg-blue-900 p-3'>Edit</button>
                        </form>
                    )}
                </Formik>
                <button className='w-[full] rounded-xl mt-5 float-right bg-red-400 p-3' onClick={async()=>{
                                const res = await fetch(`${BACKEND_URL}/api/v1/jobs/job/${id}`,{
                                    method:"DELETE",
                                    headers:{
                                        "Authorization":`Bearer ${localStorage.getItem("token")}`
                                    }
                                });
                                const data = await res.json();
                                if(!res.ok){
                                    const err = data.message;
                                    toast.error(err)
                                }else{
                                    toast.success("Job Deleted Successfully!!")
                                }
                            }}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default EditJob

const CustomLabel = ({children}:{children:React.ReactNode})=>{
    return(
        <label className='font-bold flex items-center justify-center'>{children}</label>
    )
}